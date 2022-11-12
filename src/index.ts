import '@/styles/styles'
import { arrBadNameCountries } from './badCountries'
import { ICountry, namespace } from './type'

let countAnswers = 0
let draggableObjects
let dropPoints
const arrayCountries: ICountry[] = []
const wrapper = document.querySelector('.wrapper') as HTMLElement
const startButton = document.querySelector('.btn-start') as HTMLElement
const result = document.querySelector('.result') as HTMLElement
const controls = document.querySelector('.controls-container') as HTMLElement
const dragContainer = document.querySelector(
  '.draggable-objects'
) as HTMLElement
const dropContainer = document.querySelector('.drop-points') as HTMLElement
const rangeInput = document.querySelector('.form-range') as HTMLInputElement
const startValueFlags = document.querySelector('.count-flags') as HTMLElement
const startGame = document.querySelector('.btn-game') as HTMLElement
const inPutWrapper = document.querySelector('.input-wrapper') as HTMLElement
const container = document.querySelector('.container-div') as HTMLElement
const title = document.querySelector('.title') as HTMLElement
const buttonAgain = document.querySelector('.btn-again') as HTMLElement
const buttonGameOver = document.querySelector('.btn-game-over') as HTMLElement
const LOADER = document.querySelector('.spinner_V8m1') as HTMLElement
let countFlags = Number(rangeInput.value)

async function getCountry(data: any, country: ICountry) {
  console.log('getCountry')
  let response = await fetch(country.flagUrl)
  let flagUrl = response.url
  data.innerHTML = `<img src="${flagUrl}" id="${country.code}" data-url="${flagUrl}">`
}

let deviceType = ''
let initialX = 0
let initialY = 0
let currentElement = {} as HTMLElement
let moveElement = false

const isTouchDevice = () => {
  try {
    document.createEvent('TouchEvent')
    deviceType = 'touch'
    return true
  } catch (e: any) {
    deviceType = 'mouse'
    return false
  }
}

const randomValueGenerator = () => {
  console.log('randomValueGenerator')
  return Math.floor(Math.random() * arrayCountries.length)
}

const startAgain = () => {
  currentElement = {} as HTMLElement
  controls.classList.add('hide')
  startButton.classList.add('hide')
  inPutWrapper.classList.remove('hide')
  title.textContent = 'Перетащи флаг на страну'
  buttonAgain.classList.add('hide')
  container.classList.remove('container-div-win')
  container.classList.add('hide')
  dragContainer.classList.remove('hide')
}

const gameOver = () => {
  currentElement = {} as HTMLElement
  container.classList.add('hide')
  controls.classList.remove('hide')
  startButton.classList.remove('hide')
  buttonGameOver.classList.add('hide')
  dragContainer.classList.remove('hide')
  title.textContent = 'Перетащи флаг на страну'
  buttonAgain.classList.add('hide')
  result.textContent = ''
}

const stopGame = () => {
  dragContainer.classList.add('hide')
  container.classList.add('container-div-win')
  title.textContent = 'Вы победили!'
  buttonAgain.classList.remove('hide')
  buttonAgain.addEventListener('click', startAgain)
}

function dragStart(e: any) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX
    initialY = e.touches[0].clientY
    moveElement = true
    currentElement = e.target
  } else {
    e.dataTransfer.setData('text', e.target.id)
  }
}

function dragOver(e: any) {
  e.preventDefault()
  e.target.classList.add('over')
}

const dragLeave = (e: any) => {
  e.preventDefault()
  e.target.classList.remove('over')
}

const touchMove = (e: any) => {
  if (moveElement) {
    e.preventDefault()
    let newX = e.touches[0].clientX
    let newY = e.touches[0].clientY
    let currentSelectedElement = document.getElementById(e.target.id)!
    currentSelectedElement.parentElement!.style.top =
      currentSelectedElement.parentElement!.offsetTop - (initialY - newY) + 'px'
    currentSelectedElement.parentElement!.style.left =
      currentSelectedElement.parentElement!.offsetLeft -
      (initialX - newX) +
      'px'
    initialX = newX
    initialY = newY
  }
}

const drop = (e: any) => {
  const droppableDiv = e.target
  e.preventDefault()
  if (isTouchDevice()) {
    moveElement = false
    const currentDrop = document.querySelector(
      `div[data-id='${droppableDiv.id}']`
    )!
    const currentDropBound = currentDrop.getBoundingClientRect()
    if (
      initialX >= currentDropBound.left &&
      initialX <= currentDropBound.right &&
      initialY >= currentDropBound.top &&
      initialY <= currentDropBound.bottom
    ) {
      currentDrop.classList.add('dropped')
      currentElement.classList.add('hide')
      currentDrop.innerHTML = ``
      currentDrop.insertAdjacentHTML(
        'afterbegin',
        `<img src= "${currentElement.id}.png">`
      )
      countAnswers += 1
    }
  } else {
    const draggedElementId = e.dataTransfer.getData('text')
    const droppableElementData = droppableDiv.getAttribute('data-id')
    const divNameCountry = document.createElement('div')
    divNameCountry.classList.add('name-country')
    divNameCountry.textContent = droppableDiv.dataset.name
    if (draggedElementId === droppableElementData) {
      const draggedElement = document.getElementById(
        draggedElementId
      ) as HTMLElement
      const parentDroppableElement = droppableDiv.closest('.flag-div')
      parentDroppableElement.appendChild(divNameCountry)
      droppableDiv.classList.add('dropped')
      draggedElement.classList.add('hide')
      const parentDraggedElement = draggedElement.closest(
        '.draggable-image'
      ) as HTMLElement
      parentDraggedElement.setAttribute('draggable', 'false')
      parentDraggedElement.style.cursor = 'default'
      droppableDiv.innerHTML = ``
      droppableDiv.insertAdjacentHTML(
        'afterbegin',
        `<img src="${draggedElement.dataset.url}">`
      )
      droppableDiv.classList.remove('over')
      droppableDiv.removeEventListener('dragover', dragOver)
      countAnswers += 1
    } else {
      droppableDiv.classList.remove('over')
      droppableDiv.classList.add('error')
      setTimeout(() => {
        droppableDiv.classList.remove('error')
      }, 300)
    }
  }
  if (countAnswers == countFlags) {
    result.innerText = `Вы победили!`
    stopGame()
  }
}

const creator = async () => {
  console.log('creator')
  dragContainer.innerHTML = ''
  dropContainer.innerHTML = ''
  let randomIndex: number[] = []
  let randomData: ICountry[] = []

  for (let i = 1; i <= countFlags; i++) {
    let randomValue = randomValueGenerator()
    if (!randomIndex.includes(randomValue)) {
      randomIndex.push(randomValue)
      randomData.push(arrayCountries[randomValue])
    } else {
      i -= 1
    }
  }

  for (let i of randomData) {
    const flagDiv = document.createElement('div')
    flagDiv.classList.add('draggable-image')
    flagDiv.setAttribute('draggable', 'true')
    if (isTouchDevice()) {
      flagDiv.style.position = 'absolute'
    }
    await getCountry(flagDiv, i)
    dragContainer.appendChild(flagDiv)
  }

  randomData = randomData.sort(() => 0.5 - Math.random())
  for (let i of randomData) {
    const countryDiv = document.createElement('div')

    countryDiv.classList.add('flag-div')
    countryDiv.innerHTML = `<div class='countries' data-id='${i.code}' data-name='${i.nameCountry}'>
    ${i.nameCountry}
    </div>
    `
    dropContainer.appendChild(countryDiv)
  }
  arrayCountries.length = 0
}

startButton.addEventListener('click', async () => {
  console.log('startButton')
  currentElement = {} as HTMLElement
  rangeInput.addEventListener('input', handleInput)
  controls.classList.add('hide')
  startButton.classList.add('hide')
  inPutWrapper.classList.remove('hide')
})

const handleInput = (e: any) => {
  startValueFlags.textContent = e.target.value
  countFlags = e.target.value
}

const handleStartGame = async () => {
  console.log('handleStartGame')
  await getCountryArr()

  console.log('Events')
  countAnswers = 0
  dropPoints = document.querySelectorAll('.countries')
  draggableObjects = document.querySelectorAll('.draggable-image')
  //Events
  draggableObjects.forEach((element) => {
    element.addEventListener('dragstart', dragStart)
    //for touch screen
    element.addEventListener('touchstart', dragStart)
    element.addEventListener('touchend', drop)
    element.addEventListener('touchmove', touchMove)
  })
  dropPoints.forEach((element) => {
    element.addEventListener('dragover', dragOver)
    element.addEventListener('dragleave', dragLeave)
    element.addEventListener('drop', drop)
  })
}

startGame.addEventListener('click', handleStartGame)

export async function getCountryArr() {
  console.log('getCountryArr')
  inPutWrapper.classList.add('hide')
  wrapper.classList.add('wrapper100vh')
  LOADER.classList.remove('hide')
  let response = await fetch(`https://restcountries.com/v3.1/all`)
  let data: namespace.ICountry[] = await response.json()

  for (let i = 0; i < data.length; i++) {
    const nameCountry = data[i].translations.rus.common
    if (!arrBadNameCountries.includes(nameCountry)) {
      arrayCountries.push({
        nameCountry: data[i].translations.rus.common,
        flagUrl: data[i].flags.png,
        code: data[i].cca2,
      })
    }
  }
  await creator()
  console.log('After creator')
  wrapper.classList.remove('wrapper100vh')
  LOADER.classList.add('hide')
  buttonGameOver.classList.remove('hide')
  buttonGameOver.addEventListener('click', gameOver)
  container.classList.remove('hide')
}
