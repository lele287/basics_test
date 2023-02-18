var express = require('express');
var router = express.Router();
var nousControll = require('../controllers/nouscontroller')
var passport = require('passport')

/* 设置nous路由 */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//根据类型查询医学常识分类
router.get('/getNous', function (req, res, next) {
  nousControll.getNous(req, res)
});
//根据id查询新闻
router.get('/getNousId',  function (req, res, next) {
  nousControll.getNousId(req, res)
});
//新闻排序(发布时间)
router.get('/getSort', function (req, res, next) {
  nousControll.getSort(req, res)
});
//通过当前新闻的id查询改id同类型的文章
router.get('/getByIdType', function (req, res, next) {
  nousControll.getByIdType(req, res)
});
//发布评论
router.get('/addComment', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  nousControll.addComment(req, res)
});
//查询评论
router.get('/getComment', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  nousControll.getComment(req, res)
});
//查询文章的相关评论
router.get('/getCommentId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  nousControll.getCommentId(req, res)
});
//根据类型查询标题
router.get('/getVirus', function (req, res, next) {
  nousControll.getVirus(req, res)
});
//根据id查询新闻
router.get('/getVirusId', function (req, res, next) {
  nousControll.getVirusId(req, res)
});
//通过当前新闻的id查询改id同类型的文章
router.get('/getByIdTypes', function (req, res, next) {
  nousControll.getByIdTypes(req, res)
});
module.exports = router;