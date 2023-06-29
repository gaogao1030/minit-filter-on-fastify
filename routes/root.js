'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.post('/replace', async (request, reply) => {
    const mint = fastify.get_mint()
    const content = request.body.content
    const result = content.match(/[\u4e00-\u9fa5A-Za-z0-9]+/g).join('')
    const response = mint.filter(result)
    return response
  })

  fastify.post('/verify', async (request, reply) => {
    const mint = fastify.get_mint()
    const content = request.body.content
    const result = content.match(/[\u4e00-\u9fa5A-Za-z0-9]+/g).join('')
    const status = mint.verify(result)
    return { verify: status}
  })
}

