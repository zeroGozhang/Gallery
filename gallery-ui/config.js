module.exports = {
    title: 'Gallery',
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