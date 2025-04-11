const fs =require('fs');
const path = require('path');
const rootDir = require('../utils/utils');
const filePath = path.join(rootDir,'data','favourite.json');

module.exports = class favourite{ 

 static addtofavourite(homeId, callback){
  favourite.getfavourite((favourite)=>{
    if(favourite.includes(homeId)){
      console.log("home already added");
    }
    else{
      favourite.push(homeId);
    }
    fs.writeFile(filePath,JSON.stringify(favourite),callback);
  })
  
 }
 static getfavourite(callback){
   fs.readFile(filePath,(err,data)=>{
     if (err) {
          callback([]);
        } else {
          try {
            const homes = JSON.parse(data);
            callback(homes);
          } catch (parseErr) {
            callback([]);
          }
        }
      });
 }
 static deleteById(delHomeId, callback){
    favourite.getfavourite(homeIds =>{
      homeIds = homeIds.filter(homeId => homeId !== delHomeId);
        fs.writeFile(filePath,JSON.stringify(homeIds),callback)
    })
  }
}