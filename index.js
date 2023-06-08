const { Mint } = require('mint-filter')
const fs = require('fs');
const fastify = require('fastify')({ logger: true })

let words = []
fastify.post('/replace', async (request, reply) => {
  const mint = new Mint(words)
  const status = mint.filter(request.body.content)
  return status
})

fastify.post('/verify', async (request, reply) => {
  const mint = new Mint(words)
  const status = mint.verify(request.body.content)
  return { verify: status}
})

const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

const readStream = fs.createReadStream('words.txt', 'utf8');

readStream.on('data', (chunk) => {
  const lines = chunk.split('\n');
  words = words.concat(lines)
});

readStream.on('end', () => {
  start()
});  

