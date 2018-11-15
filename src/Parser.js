const logging = require('./logging')

// Custom error types
class ParserError extends Error {}
class ParserInvalidError extends Error {}

class Parser {
  static get Error () {
    return ParserError
  }

  static get InvalidError () {
    return ParserInvalidError
  }

  constructor (engine, config) {
    this._engine = engine
    this._config = config
  }

  parse (results) {
    const msg = 'No `parse` method found on the defined Parser, did you forget to override it?'
    throw new Error(`${this.constructor.name}(...): ${msg}`)
  }

  findFare (cabin, saver = true) {
    return this._config.fares.find(x => x.cabin === cabin && x.saver === saver)
  }

  isPartner (segments, others = []) {
    const operators = [ this.results.engine, ...others.map(x => x.toUpperCase()) ]
    return !segments.every(x => operators.includes(x.airline))
  }

  get id () {
    return this._engine
  }

  get config () {
    return this._config
  }

  get results () {
    return this._results
  }

  get query () {
    return this._results.query
  }

  _initialize (results) {
    this._results = results
  }
}

module.exports = logging(Parser)
