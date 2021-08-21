const router = require('koa-router')()

const article = require('./article')


router.use('/api', article.routes(), article.allowedMethods())

module.exports = router