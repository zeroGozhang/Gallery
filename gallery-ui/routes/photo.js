var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.id)
   // Mock数据
   const mockData = {
  photos:[                                                  
      {size:19, src:"https://img5.jianke.com/mall/jktt/201903/b7de90e39dc44a5ea7773b05de0ee113.jpg",name:"test1"},                                                  
      {size:20, src:"https://img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
      {size:19, src:"https://img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"}                                                  
  ],
    description:'这是一段描述',
    galleryHtml : 'gallery',
    title: 'gallery',
    staticFiles : 'public/images',
    urlRoot : '/',
    render : false,
    cdnDomain: '/',
    avatar: '/images/avatar.png',
  }

  res.render('photo', mockData);

});

module.exports = router;
