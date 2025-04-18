const Home = require('../models/home');

exports.getAddHome=(req, res, next)=>{
  console.log(req.url,req.method);
 res.render('host/edit-home',{pageTitle: 'HomeHive | Add Home',editing: false});
}
exports.getHosthome = (req, res, next)=>{
  Home.fetchAll().then(([registeredHomes])=>{
    res.render('host/host-home-list',{registeredHomes,pageTitle:'HomeHive | host homes'});
  });
}
exports.getEditHome = (req, res, next)=>{
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then(([homes])=>{
    const home = homes[0];
    if(!home){
      return res.redirect('/host-home-list');
    }
    res.render('host/edit-home',{home:home,editing:editing,pageTitle: "HomeHive | edit home"});
  });
}

exports.homeAdded=(req, res, next) => {
  const {homename, homeImg, location, price, rating, description} = req.body;
  const home = new Home(homename, homeImg, location, price, rating, description);
  home.save();
  res.redirect("/host-home-list");
}
exports.postEditHome=(req, res, next) => {
  const {id, homename, homeImg, location, price, rating, description} = req.body;
  const home = new Home(homename, homeImg, location, price, rating, description, id);
  home.save();
  res.redirect("/host-home-list");
}
exports.postDeleteHome=(req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  Home.deleteById(homeId).then(error =>{
    if(error){
      console.log(error);
    }
    res.redirect("/host-home-list");
  })
};
    
      