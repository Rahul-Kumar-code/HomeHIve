const favourite = require('../models/favourite');
const Home = require('../models/home');

exports.gethome = (req, res, next)=>{
  Home.fetchAll().then(([registeredHomes])=>{
    res.render('store/home-list',{registeredHomes,pageTitle:'HomeHive | Homes'});
  })
}
exports.gethomeDetails = (req, res, next)=>{
    const homeId = req.params.homeId;
    console.log(req.url,req.method);
    Home.findById(homeId).then(([homes]) => {
      const home = homes[0];
      if(!home){
         res.redirect('/homes');
      }
      else{
        res.render('store/home-detail',{home: home,pageTitle:'HomeHive | home details'});
      }
    })
  };

exports.getIndex = (req, res, next)=>{
    Home.fetchAll().then(([registeredHomes])=>{
      res.render('store/index',{registeredHomes,pageTitle:'HomeHive'});
    })
}
exports.getBookings= (req, res, next)=>{
    res.render('store/bookings',{pageTitle:'HomeHive | my bookings'});
}
exports.postaddtofavourite= (req, res, next)=>{
  favourite.addtofavourite(req.body.id, (err)=>{
    if(err){
      console.log(err);
    }
    res.redirect('/favourites');
  }
)
  console.log(req.body);
}
exports.postRemoveFavourite= (req, res, next)=>{
 const homeId = req.params.homeId;
 favourite.deleteById(homeId).then(err =>{
  if(err){
console.log(err);
  }
  res.redirect('/favourites');
 })
}
exports.getFavouriteList= (req, res, next)=>{
 favourite.getfavourite((favourite) =>{
  Home.fetchAll.then((([registeredHomes]) =>{
    const favouriteHomes = registeredHomes.filter(home => favourite.includes(home.id));
    console.log(req.url,req.method,favouriteHomes);
    res.render('store/favourite-list',{favouriteHomes,pageTitle:'HomeHive | favourites'});
  } ))
  });
}
