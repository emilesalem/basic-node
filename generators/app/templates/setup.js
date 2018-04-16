const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiHttp = require('chai-http')
const nock = require('nock')
const proxyquire = require('proxyquire')
const chaiPromise = require('chai-as-promised')

chai.use(sinonChai)
chai.use(chaiHttp)
chai.use(chaiPromise)

nock.disableNetConnect()
nock.enableNetConnect('127.0.0.1')

global.expect = chai.expect
global.sinon = sinon
global.chai = chai
global.nock = nock
global.proxyquire = proxyquire.noPreserveCache().noCallThru()
