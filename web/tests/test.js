const Nightmare = require('nightmare')
const assert = require('assert')

describe('Landing Page', function() {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('/ (Home Page)', () => {
    it('should render landing page', done => {
      nightmare.goto('http://localhost:3000/')
        .exists('#root > div > div > div > div > div > div:nth-child(1) > a > img')       // Image of Macaroons exists
        .exists('#root > div > div > div > div > div > div:nth-child(1) > a > span > b')  // Name "Macaroons" exists
        .exists('#root > div > div > div > div > div > div:nth-child(1) > a > small')     // Macaroons description text exists
        .wait(1000)
        .click('#root > div > div > div > div > div > div:nth-child(1) > a > img')        // Click on the image of the Macaroons, Navigates to Macaroons detail page
        .wait(1000)
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })
})
describe('Macaroon Page', function() {
  this.timeout('30s')

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare({ show: true })
  })

  describe('/', () => {
    it('should render detail page', done => {
      nightmare.goto('http://localhost:3000/item/5c2a5f49a397640e17f0eb08')
        .exists('#root > div > div > div > div.container-fluid > div > div > img')                            // Macaroon Header Image exists
        .exists('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > h2')                // Macaroons Item Name exists
        .exists('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > p')                 // Macaroon Item Description exists
        .exists('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > b > span')          // Add to Cart exists
        .exists('#root > div > div > div > div.container > div:nth-child(3) > div.col-4 > div > a > button')  // Checkout button exists
        .wait(1000)
        .click('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > b > span')           // Click on Add to Cart
        .wait(1000)
        .click('#root > div > div > div > div.container > div:nth-child(3) > div.col-4 > div > a > button')   // Click on Checkout
        .wait(1000)
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
        .click('#root > div > div > div > div.container > div:nth-child(3) > div.col-8 > b > span')                                                  // Click on Add to Cart
        .wait(1000)
        .click('#root > div > div > div > div.container > div:nth-child(3) > div.col-4 > div > a')                                                  // Click on Checkout
        .wait(1000)
        .exists('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(12) > button')                                    //"Back" button exists
        .exists('#root > div > div > div.container > div > div.col-4 > div > div:nth-child(6) > div.col-sm-3 > span')                               //"Submit" button exists
        .exists('#root > div > div > div.container > div > div.col-4 > div > div:nth-child(6) > div.col-sm-3 > span')                               // Grand Total price exists
        .exists('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(1) > input[type="email"]')                        // Email field exists
        .exists('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(3) > input[type="number"]')                       // Card number field exists
        .wait(1000)
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(1) > input[type="email"]', 'axel@bfloschool.com')   // Type axel@bfloschool.com into email field
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(2) > input[type="text"]', 'Axel Neff')              // Type Axel Neff into Name field
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(3) > input[type="number"]', '4242424242424242')     // Type credit card number into Card Number field
        .select('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(4) > select', '02')                               // Select Credit Card Expiration Month for February
        .wait(1000)
        .select('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(5) > select', '20')                               // Select Credit Card Expiration Year for 2020
        .wait(1000)
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(8) > input[type="text"]', '123')                    // Type credit card CVV as 123
        .type('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(9) > input[type="text"]', '14221')                  // Type zip code as 14221
        .wait(1000)
        .click('#root > div > div > div.container > div > div.col-8 > form > div > div:nth-child(13) > input')                                      // Click on submit button
        .wait(1000)
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
  })
})
