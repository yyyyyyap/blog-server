const ArticleModel = require('../models/article')

class articleController {
  /**
   * @description  创建文章 
   * @param  {}
   * @return {}
   */
  static async create(ctx) {
    // 接受客户端的请求
    let req = ctx.request.body;
    if (req.title && req.author && req.content && req.category) {
      try {
        // 创建文章模型
        const ret = await ArticleModel.createArticle(req)
        const data = await ArticleModel.getArticleDetail(ret.id)

        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '创建文章成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '创建文章失败',
          data: err
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 200,
        msg: '参数不齐全'
      }
    }
  }

  /**
   * @description 获取所有文章除内容之外的信息
   * @param  {}
   * @return {}
   */
  static async allDetail(ctx) {
    try {
      // 查询文章详情模型
      let data = await ArticleModel.getAllArticle();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }

  /**
   * @description 查询最新的一定批量的文章除内容之外的信息 
   * @param  {}
   * @return {}
   */
  static async getBatchArticle(ctx) {
    try {
      let offset = ctx.query.offset
      let limit = ctx.query.limit
      // 查询文章详情模型
      let data = await ArticleModel.getLastestArticle(offset, limit);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }

  
  /**
   * @description 查询最近更新的文章除内容之外的信息，后期可改为根据点赞数查阅
   * @param  {}
   * @return {}
   */
  static async getBatchUpdatedArticle(ctx) {
    try {
      let offset = ctx.query.offset
      let limit = ctx.query.limit
      // 查询文章详情模型
      let data = await ArticleModel.getLastestUpdatedArticle(offset, limit);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }

  /**
   * @description 获取文章详情
   * @param  {}
   * @return {}
   */
  static async detail(ctx) {
    let id = ctx.query.id;
    if (id) {
      try {
        // 查询文章详情模型
        let data = await ArticleModel.getArticleDetail(id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '查询成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '查询失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '缺少文件id'
      }
    }
  }

  static async articleAmount(ctx) {
    try {
      // 查询文章数量模型
      let data = await ArticleModel.getArticleAmount();
      console.log(data)
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }

  static async searchArticle(ctx) {
    let title = ctx.query.title
    let desc = ctx.query.desc
    try {
      // 根据条件查询文章
      let data = await ArticleModel.searchArticleByCon(title, desc);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }

  static async getArticle(ctx) {
    let params = ctx.query
    console.log(params)
    let {sortField, isPos, offset, limit, title, desc, category} = params
    try {
      // 根据条件查询文章
      let data = await ArticleModel.getArticle(sortField, isPos, offset, limit, title, desc, category);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: '查询成功',
        data
      }
    } catch (err) {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data
      }
    }
  }
}

module.exports = articleController;