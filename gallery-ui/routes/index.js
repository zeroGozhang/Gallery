var express = require('express'),
  request = require('request'),
ejs = require('ejs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Mock数据
  const mockData = {
    user:
    {
      name: "Tony Hawk",
      birthyear: 1968,
      career: "skateboarding",
      bio: "<b>Tony Hawk</b> is the coolest skateboarder around."
  },
    galleryHtml : '<% include gallery %>',
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
  // console.log(mockData.comments.length)
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
  request('http://107.182.180.211:7001/m/gallery', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const galleryRows = JSON.parse(body);
      const contents = [];
      galleryRows.data.list.forEach(element => {
        contents.push({
          url:`/photo?id=${element.id}`,
          img:element.cover,
          name:element.name
        })
      });
      mockData.contents= contents;
      return res.render('index', mockData);
    }
      
  })
});

module.exports = router;
