var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.id)
   // Mock数据
   const mockData = {
    description:'这是一段描述',
    galleryHtml : 'gallery',
    title: 'gallery',
    staticFiles : 'public/images',
    urlRoot : '/',
    render : false,
    cdnDomain: '/',
    avatar: '/images/avatar.png',
  }
  request(`http://127.0.0.1:7001/m/gallery/${req.query.id}/photoList`, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const photoRows = JSON.parse(body);
    const photos = [];
    photoRows.result.list.forEach(element => {
      photos.push({
        size: '1280x1276',
        src:element.url,
        name:element.name,
      })
    });
    mockData.photos=photos;
    res.render('photo', mockData);
    // console.log(body) // Show the HTML for the baidu homepage.
  }
})


});

module.exports = router;
