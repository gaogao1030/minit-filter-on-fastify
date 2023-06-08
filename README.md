# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

### Usage
```
# 基于 https://github.com/ZhelinCheng/mint-filter 做敏感词过滤, 敏感词词列表在words.txt文件内

# 验证接口
curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"content\":\"我是敏感词,我不是敏感词\"}" https://api.aigpt.studio/sensitive_word/verify

# 屏蔽敏感词接口
curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"content\":\"我是敏感词,我不是敏感词\"}" https://api.aigpt.studio/sensitive_word/replace
```
