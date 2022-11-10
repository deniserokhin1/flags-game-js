import '@/styles/styles'
import { LOADER } from './assets'
import { dataCountries } from './by-code'

let countFlags = 4
let countAnswers = 0
let draggableObjects
let dropPoints
const startButton = document.querySelector('.btn-start') as HTMLElement
const result = document.querySelector('.result') as HTMLElement
const controls = document.querySelector('.controls-container') as HTMLElement
const dragContainer = document.querySelector(
  '.draggable-objects'
) as HTMLElement
const dropContainer = document.querySelector('.drop-points') as HTMLElement
const rangeInput = document.querySelector('.form-range') as HTMLElement
const startValueFlags = document.querySelector('.count-flags') as HTMLElement
const startGame = document.querySelector('.btn-game') as HTMLElement
const inPutWrapper = document.querySelector('.input-wrapper') as HTMLElement
const container = document.querySelector('.container-div') as HTMLElement

async function getCountry(data: any, code: string) {
  data.innerHTML = LOADER
  let response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
  let country = await response.json()
  let flag = country[0].flags.png
  data.innerHTML = `<img src="${flag}" id="${code}" data-url="${flag}">`
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
  return dataCountries[Math.floor(Math.random() * dataCountries.length)]
}

const stopGame = () => {
  controls.classList.remove('hide')
  startButton.classList.remove('hide')
  container.classList.add('hide')
  let countFlags = 4
}

function dragStart(e: any) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX
    initialY = e.touches[0].clientY
    moveElement = true
    currentElement = e.target
  } else {
    console.log(e.target)
    e.dataTransfer.setData('text', e.target.id)
  }
}

function dragOver(e: any) {
  e.preventDefault()
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
  e.preventDefault()
  if (isTouchDevice()) {
    moveElement = false
    const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`)!
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
    const draggedElementData = e.dataTransfer.getData('text')
    const droppableElementData = e.target.getAttribute('data-id')
    if (draggedElementData === droppableElementData) {
      const draggedElement = document.getElementById(
        draggedElementData
      ) as HTMLElement
      e.target.classList.add('dropped')
      draggedElement.classList.add('hide')
      draggedElement.setAttribute('draggable', 'false')
      e.target.innerHTML = ``
      e.target.insertAdjacentHTML(
        'afterbegin',
        `<img src="${draggedElement.dataset.url}">`
      )
      countAnswers += 1
    }
  }
  if (countAnswers == countFlags) {
    result.innerText = `Вы победили!`
    stopGame()
  }
}

const creator = () => {
  dragContainer.innerHTML = ''
  dropContainer.innerHTML = ''
  let randomData = [] as any

  for (let i = 1; i <= countFlags; i++) {
    let randomValue = randomValueGenerator()
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue)
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
    getCountry(flagDiv, i.value)
    dragContainer.appendChild(flagDiv)
  }

  randomData = randomData.sort(() => 0.5 - Math.random())
  for (let i of randomData) {
    const countryDiv = document.createElement('div')
    countryDiv.classList.add('flag-div')
    countryDiv.innerHTML = `<div class='countries' data-id='${i.value}'>
    ${i.text}
    </div>
    `
    dropContainer.appendChild(countryDiv)
  }
}

startButton.addEventListener('click', async () => {
  currentElement = {} as HTMLElement

  controls.classList.add('hide')
  startButton.classList.add('hide')
  inPutWrapper.classList.remove('hide')
})

const handleInput = (e: any) => {
  startValueFlags.textContent = e.target.value
  countFlags = e.target.value
}

rangeInput.addEventListener('input', handleInput)

const handleStartGame = async () => {
  inPutWrapper.classList.add('hide')
  container.classList.remove('hide')
  await creator()
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
    element.addEventListener('drop', drop)
  })
}

startGame.addEventListener('click', handleStartGame)
