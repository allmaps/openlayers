const { describe, it } = require('mocha')
const { expect } = require('chai')

const allmaps = require('../dist/cjs/index.js')

const expectedKeys = [
  'IIIFLayer',
  'WarpedMapLayer'
]

describe(`Functions exported by CommonJS build`, () => {
  it('should match expected output', () => {
    expect(allmaps).to.have.all.keys(expectedKeys)
  })
})
