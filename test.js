const request = require('request'); //nicer and easier package for making api call, kind like ajax for node


// request.get('http://swapi.co/api/people/1', function(err, res, body){
  
//   console.log('err:', err);
//   console.log('body:', body);

// });

//or

//Function to get a particular person
//Custom Callback
function getPerson(id, callback){     //callback allow to pass in a function as second arg
    request.get(`http://swapi.co/api/people/${id}/`, function(err, res, body){
    
      // console.log('err:', err);
      // console.log('body:', body);

      if(err){
        callback(err);
      }else {
        callback(null, body); //invoking the function  
      }
    });
}


getPerson(5, function(err, body){ // This is the callback

  console.log('body in callback:', body);
});








