'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const { Mint } = require('mint-filter')
const fs = require('fs');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.addHook('onReady', function (done) {
    const readStream = fs.createReadStream('words.txt', 'utf8');
    let words = []

    readStream.on('data', (chunk) => {
      const lines = chunk.split('\n');
      words = words.concat(lines)
    });

    readStream.on('end', () => {
      const mint = new Mint(words)
      fastify.decorate('get_mint', function (){
        return mint
       })
      done()
    });  

  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
