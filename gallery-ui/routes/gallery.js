var express = require('express'),
ejs = require('ejs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Mock数据
  const mockData = {
    galleryHtml : req.html,
    title: '相册',
    staticFiles : 'public/images',
    urlRoot : '/',
    render : false,
    cdnDomain: '/',
    avatar: '/images/avatar.png',
    wording: {
      noAccess: '抱歉，你没有权限访问'
    },
    albums: {
      "铁山尖": {
        thumbnail: "1.jpg",
        description: '美丽的家乡',
        name: '家乡'
      }, 
      "公司摄影": {
        description : "人情似水",
        thumbnail: "2.jpg",
        name: "企业"
      },
      "雪乡": {
        description: "美丽的哈尔滨",
        thumbnail: "3.jpg",
        name: "哈尔滨",
      }
    }
  }
  var common;

  if (!mockData){
    throw new Error('No config specified');
  }
  
  if (!mockData.staticFiles || !mockData.urlRoot){
    throw new Error('Both staticFiles and urlRoot must be specified');
  }
  var config = mockData;
  var common = require('../core/common')(config), 
  middleware;

  mockData.staticFiles = common.friendlyPath(mockData.staticFiles);
  mockData.urlRoot = common.friendlyPath(mockData.urlRoot);
  res.render('index', mockData);
});

module.exports = router;
