const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');

const dataFilePath = path.join(__dirname, '../data/cats.json');


exports.getAll = function(callback){  //need callback because we're doing aynchronous stuff
  //Function's Job
  // 1.read json file to get the data
  // 2. parse the data to get the array
  // 3. callback with the array (if there's an error, callback with error)

  fs.readFile(dataFilePath, (err, buffer) => {
    //read and parse

    if(err) {          //or shorthand -> if(err) return callback(err);
      callback(err);
      return;  //this is actually calling back the error
    }

    let cats;
    
    try{
      cats = JSON.parse(buffer);
     }catch(err) {
      callback(err);
      return;
     }

     //we have cats now, so callback, Wish is real now!
     callback(null, cats);
   
  });
}

exports.getById = (id, callback) =>{
  aCat((err, cats) =>{
    if(err) return callback(err);
    callback(null, cats);
  });
}

exports.create = function(catObj, callback) {
  //get and parse was done already,so we use getAll
  exports.getAll(function(err, cats){ 
  //or this.getAll() //This is the exports obj
    
    if(err) return callback(err);

    //unique ID //UUID Package
    catObj.id = uuid.v4()


    cats.push(catObj); //update

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){//stringify
      callback(err);
    });
  });
}

exports.update = (catObj, id, callback) =>{
  this.getAll((err, cats) => {
    if(err) return callback(err);
    catObj.id === id;
    cats = cats(catObj => catObj.id != id);
    let newCat = {
      name: name,
      type: type,
      id:id
    }
    cats.push(newCat);
  })
}

//received ok from postman for delete
exports.delete = (id, callback) =>{
  this.getAll((err, cats)=>{
    if(err) return callback(err);
     fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
          callback(err);
        })
  });
}