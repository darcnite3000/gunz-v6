export var webmasterList = [
  {
    id: 'galleries',
    link: 'galleries',
    description: 'Dozens of new FHGs are released each week for each and every update on the sites.',
    image: "assets/images/tool_fhg.jpg",
    title: "MP4, MPEG, & Image FHGs",
  },
  {
    id: 'feeds',
    link: 'feeds',
    description: 'Includes customisable RSS Feeds and preview modules that show upcoming paysite updates.',
    image: "assets/images/tool_rss.jpg",
    title: "RSS & Syndication",
  },
  {
    id: 'trailers',
    link: 'trailers',
    description: 'Our customisable paysite trailer player allows you to bring our paysites videos straight to your surfers, single or auto updating.',
    image: "assets/images/tool_trailer.jpg",
    title: "Trailer Player",
  },
  {
    id: 'iframe',
    link: 'iframe',
    description: 'Auto-Updating Banners and a Thumbnail Gallery Tool are just some of the great dynamic sales methods we offer.',
    image: "assets/images/tool_iframe.jpg",
    title:"iFrame Tools",
  },
  {
    id: 'banners',
    link: 'banners',
    description: 'We provide literally 50+ new banners each week based on paysite updates.',
    image: "assets/images/tool_banner.jpg",
    title: "Banners",
  }
];

export var webmasterHomeList = webmasterList.map((tab)=>{
  var {id, link, image, title} = tab;
  return {id, link, image, title};
});

export var tourList = webmasterList.map((tab)=>{
  var {id, link, description, image, title} = tab;
  link = 'http://gunzblazingpromo.com/testpage/';
  var remote = true;
  return {id, link,remote, description, image, title};
});

export var tourHomeList = tourList.map((tab)=>{
  var {id, link, remote, image, title} = tab;
  return {id, link, remote, image, title};
})

