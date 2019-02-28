const Nightmare = require('nightmare')
const assert = require('assert')
const localStorage = require('mock-local-storage')

describe('Landing Page', function() {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('/ (Home Page)', () => {
    it('should render landing page', done => {
      nightmare.goto('http://localhost:3000/')
        .exists('#root > div > div > nav')
        .exists('#root > div > div > div > div > div')
        .exists('#root > div > div > div > div > h2')
        .exists('#root > div > div > div > div > div')
        .click('#root > div > div > div > div > div > div:nth-child(1)')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })
})

describe('Detail Page', function() {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('/', () => {
    it('should render detail page', done => {
      nightmare.goto('http://localhost:3000/item/5c2a5f49a397640e17f0eb08')
        .exists('#root > div > div > div > div.container-fluid > div > div > img')
        .exists('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > h2')
        .exists('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > p')
        .exists('#root > div > div > div > div.container > h2')
        .exists('#root > div > div > div > div.container > div:nth-child(8)')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })
})

describe('Checkout Flow Page', function() {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('/', () => {
    it('should render checkout page', done => {
      nightmare.goto('http://localhost:3000/item/5c2a5f49a397640e17f0eb08')
        .click('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > b > span')
        .click('#root > div > div > div > div.container > div:nth-child(3) > div.col-4 > div > a')
        .wait(1000)
        .exists('#root > div > div > div.container > div > div.col-8 > h4 > b')
        .exists('#root > div > div > div.container > div > div.col-8 > p')
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(1) > input[type="email"]', 'gregg@bfloschool.com')
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(2) > input[type="text"]', 'Joe Smoe')
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(3) > input[type="number"]', '4242424242424242')
        .select('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(4) > select', '01')
        .select('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(5) > select', '24')
        .select('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(8) > input[type="text"]', '123')
        .select('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(9) > input[type="text"]', '14221')
        .exists('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(12) > button')
        .click('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(13) > input')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })
})
