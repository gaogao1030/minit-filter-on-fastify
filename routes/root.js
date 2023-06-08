'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.post('/replace', async (request, reply) => {
    const mint = fastify.get_mint()
    const status = mint.filter(request.body.content)
    return status
  })

  fastify.post('/verify', async (request, reply) => {
    const mint = fastify.get_mint()
    const status = mint.verify(request.body.content)
    return { verify: status}
  })
}

