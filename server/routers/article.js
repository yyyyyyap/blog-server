const router = require('koa-router')()
const ArticleController = require('../controllers/article')

/**
 * 文章接口
 */
router.prefix('/article')
//创建文章
router.post('/create', ArticleController.create);

//获取所有文章详情
router.get('/findAll', ArticleController.allDetail)

//获取文章详情
router.get('/find', ArticleController.detail)

// 获取文章数量
router.get('/amount', ArticleController.articleAmount)

// 根据条件查询文章
router.get('/searchArticle', ArticleController.searchArticle)

// 根据偏移和数量限制获取一定批量的文章
router.get('/getBatchArticle', ArticleController.getBatchArticle)

// 根据偏移和数量限制获取一定批量最近更新的文章
router.get('/getBatchUpdatedArticle', ArticleController.getBatchUpdatedArticle)

// 根据偏移和数量限制获取一定批量最近更新的文章
router.get('/getArticle', ArticleController.getArticle)
module.exports = router