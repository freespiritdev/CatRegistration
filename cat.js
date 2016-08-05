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


//fix this
exports.update = (id, updateObj, callback) =>{
  exports.getAll(function(err, cats) {
    if(err) return callback(err);

    let cat = cats.filter(cat => cat.id === id)[0];

    if(!cat) { //if cat isn't found
      return callback({error: "Cat not found."});
    }

    let index = cats.indexOf(cat);

    for(let key in updateObj) {  //for in loop allows you to iterate over keys in objects
      cat[key] = updateObj[key]; //allows you to change this object
    }  

    cats[index] = cat;

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){//stringify
      if(err) return callback(err);
      
      callback(null, cat);
    });

// //received ok from postman for delete
// exports.delete = (id, callback) =>{
//   this.getAll((err, cats)=>{
//     if(err) return callback(err);
//      fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
//           callback(err);
//         })
//   });
// }

