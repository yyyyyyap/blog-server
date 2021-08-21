// 引入mysql的配置文件
const db = require('../utils/db')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// 引入sequelize对象
const sequelize = db.sequelize

// 引入数据表模型
// const Article = Sequelize.import('../schema/article') // 老版写法 
const Article = require("../schema/article")(sequelize, Sequelize.DataTypes)
Article.sync({
  force: false
}) // 自动创建表

class ArticleModel {
  /**
   * @description  创建文章模型 
   * @param  {object} data
   * @return {Promise}
   */
  static async createArticle(data) {
    return await Article.create({
      title: data.title,
      desc: data.desc,
      author: data.author,
      content: data.content,
      category: data.category
    })
  }

  /**
   * @description 查询所有文章除内容之外的信息 
   * @return {Promise}
   */
  static async getAllArticle() {
    return await Article.findAll({
      attributes: { exclude: ['content'] }
    })
  }

  /**
   * @description 查询最新的文章除内容之外的信息 
   * @return {Promise}
   */
  static async getLastestArticle(offset, limit) {
    return await Article.findAll({
      order: [['createdAt', 'DESC']],
      offset: +offset,
      limit: +limit,
      attributes: { exclude: ['content'] }
    })
  } 

  /**
   * @description 查询最新的文章除内容之外的信息 
   * @return {Promise}
   */
  static async getLastestUpdatedArticle(offset, limit, aaa) {
    return await Article.findAll({
      order: [['updatedAt', 'DESC']],
      offset: +offset,
      limit: +limit,
      attributes: { exclude: ['content'] }
    })
  } 

  /**
   * @description 查询文章的详情 
   * @param  {String} id
   * @return {Promise}
   */
  static async getArticleDetail(id) {
    return await Article.findOne({
      where: {
        id
      }
    })
  }

  /**
   * @description 查询文章总数 
   * @return {Promise}
   */
  static async getArticleAmount() {
    return await Article.count()
  } 

    /**
   * @description  根据条件搜索对应文章
   * @param  {String} id
   * @return {Promise}
   */
  static async searchArticleByCon(title, desc){
    console.log(title)
    console.log(desc)
    return await Article.findAll({
      where: {
        [Op.and] : [
          {title: { [Op.like]:'%' + title + '%' }},
          {desc: { [Op.like]:'%' + desc + '%' }}
        ],
      },
    })
  }

  /**
   * @description  一个通用的获取文章内容的接口（o不包括文章内容） 
   * @param  {String} sortField 排序的字段名
   * @param  {String} isPos 排序的方向，为1时正序，为0时倒序
   * @param  {String} offset 检索的偏移量
   * @param  {String} limit 检索的数量
   * @param  {String} title 根据标题进行模糊搜索
   * @param  {String} desc 根据内容进行模糊搜索
   * @param  {String} category 根据类别进行查找
   * @return {Promise} 
   */
  static async getArticle (sortField, isPos, offset, limit, title, desc, category) {
    console.log(sortField, isPos, offset, limit, title, desc, category)
    title = title ? title : ''
    desc = desc ? desc : ''
    let order = +isPos ? 'ASC' : 'DESC'
    if (category) {
      return await Article.findAll({
        order: [[sortField, order]],
        offset: +offset,
        limit: +limit,
        attributes: { exclude: ['content'] },
        where: {
          [Op.and]: [
            {title: { [Op.like]:'%' + title + '%' }},
            {desc: { [Op.like]:'%' + desc + '%' }},
            {category: category}
          ]
        }
      })
    } else {
      return await Article.findAll({
        order: [[sortField, order]],
        offset: +offset,
        limit: +limit,
        attributes: { exclude: ['content'] },
        where: {
          [Op.and]: [
            {title: { [Op.like]:'%' + title + '%' }},
            {desc: { [Op.like]:'%' + desc + '%' }},
          ]
        }
      })
    }
  }
}

module.exports = ArticleModel