const PORT = process.env.PORT || 3000; //process.env for Heroku
const express = require('express');
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser')
const Cat = require('./models/cat');

const app = express();

//GENERAL MIDDLEWARE

app.set('view engine', 'pug'); //which engine for res.render to use
app.set('views', './views'); //direct where pug files are loaded

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/', (req, res, next) => {
  // let filepath = path.join(__dirname, './index.html');
  // res.sendFile(filepath);
  Cat.getAll(function (err, cats){
    res.render('index', { title: "Cat Registration", cats }) //finds the index.pug file in the views directory, //render it into html and then sends that html
  });
});

app.route('/cats')
  .get((req, res) => {
    //GET /cats - get all cats

    Cat.getAll(function(err, cats){ //Wish /Custom
      if(err) {
        res.status(400).send(err);
      }else{
        res.send(cats)
      }
    });  
  })
  .post((req, res)=>{
    //POST /cats -create a new cat

    Cat.create(req.body, function(err) {
      if(err){
        res.status(400).send(err);
      }else{
        res.send();
      }
    });
  });


// app.route('/cats/:id')
//   .get((req, res) =>{
//     res.send(`Here is cat #${req.params.id}!`);
//   })
//   .put((req, res) =>{
//     let catId = req.params.id;
//     let updateObj = req.body;

//     Cat.update(catId, updateObj, function(err, newCat) { //Wish
//       if(err) {
//         res.status(400).send(err);
//       }else {
//         res.send(newCat);
//       }
//     });
// })

  // app.put('/cats/:id', (req, res) =>{
  //   Cat.update(req.body, req.params.id, err =>{
  //      if(err){
  //       res.status(400).send(err);
  //     }else{
  //       res.send();
  //     }
  //   });
  // });

//GET /cats/5 using .get
// app.get('/cats/:id', (req, res)=>{   // ":" means it's dynamic and will be in params under that key
// //makes a route with url params
//   console.log('req.params.id:', req.params);
//   res.send('one cat!');
// });

app.route('/cats/:id')
  .get((req, res) =>{
    res.send(`Here is cat #${req.params.id}!`);
  })
.put((req, res) =>{
  let catId = req.params.id;
  let updateObj = req.body;

  Cat.update(catId, updateObj, function(err, newCat) { //Wish
    // done in one step if err give 400 and send err if not send 200 and newCat
    res.status(err ? 400 :200).send(err || newCat);  // should be used when you want something from 1 of 2 values
    // if(err) {
    //   res.status(400).send(err);
    // }else {
    //   res.send(newCat);
    // }

  });
})
.delete((req, res) =>{

  let catId = req.params.id;

  Cat.remove(catId, err => {
    res.status(err ? 400 :200).send(err);
  });
});

//Timestamp Route
app.get('/timestamp', (req, res) => {
  res.send({timestamp: Date.now() }); //Date has to be wrapped in an object
});



app.listen(PORT, err => {
  console.log(err ||  `Server listening on port ${PORT}`);   
                                                          
                                                          
});                                                     