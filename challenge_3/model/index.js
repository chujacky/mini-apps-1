var db = require('../data');

module.exports = {
  post: (param, cb) => {
    var queryString = 'INSERT INTO sales (name,password,email) VALUES (?,?,?)';
    db.query(queryString, param, (err, reuslt) =>{
      if (error){
        console.log(error);
        cb(error);
      } else {
        cb(null, result);
      }
    })
  }
}
