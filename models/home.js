const db = require('../utils/databaseUtil');

module.exports = class Home{
  constructor(homename, homeImg, location, price, rating, description, id){
    this.homename = homename;
    this.homeImg = homeImg;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.description = description;
    this.id = id;
  }
  save(){
    if(this.id){
      return db.execute(`update homes set homename=?, price=?, location=?, rating=?, description=?, homeImg=?  where id=?`,[this.homename, this.price, this.location, this.rating, this.description, this.homeImg, this.id]);
    }else{
      return db.execute(`insert into homes (homename, homeImg, location, price, rating, description) values (?,?,?,?,?,?)`,
        [this.homename,this.homeImg,this.location,this.price,this.rating,this.description]);
    }
       }

  static fetchAll(callback){
    return db.execute('select * from homes');
  }

  static findById(homeId){
    return db.execute('select * from homes where id=?',[homeId]);
  }

  static deleteById(homeId){
    return db.execute('delete from homes where id=?',[homeId]);

}
}