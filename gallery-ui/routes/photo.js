var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.id)
   // Mock数据
   const mockData = {
  // photos:[                                           
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/b7de90e39dc44a5ea7773b05de0ee113.jpg",name:"test1"},                                                  
  //     {size:20, src:"//img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"},
  //     {size:20, src:"//img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"},
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/b7de90e39dc44a5ea7773b05de0ee113.jpg",name:"test1"},                                                  
  //     {size:20, src:"//img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"},
  //     {size:20, src:"//img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"},
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/b7de90e39dc44a5ea7773b05de0ee113.jpg",name:"test1"},                                                  
  //     {size:20, src:"//img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"},
  //     {size:20, src:"//img5.jianke.com/mall/jktt/201903/5cc7d1cf83864f46b50c3b720dad45e2.jpg",name:"test2"},                                                  
  //     {size:19, src:"//img5.jianke.com/mall/jktt/201903/5bda5516bc3045578c4f67f774d76b99.jpg",name:"test3"}                                                                                     
  // ],
    description:'这是一段描述',
    galleryHtml : 'gallery',
    title: 'gallery',
    staticFiles : 'public/images',
    urlRoot : '/',
    render : false,
    cdnDomain: '/',
    avatar: '/images/avatar.png',
  }
  console.log(`http://45.62.108.63:7001/m/gallery/${req.query.id}/photoList`)

  request(`http://45.62.108.63:7001/m/gallery/${req.query.id}/photoList`, function (error, response, body) {
    console.log(body);
  if (!error && response.statusCode == 200) {  
    console.log(JSON.parse(body));
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
