const PORT = process.env.PORT || 3000;

const express = require('express');
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser')
const Cat = require('./models/cat');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/', (req, res, next) => {
  let filepath = path.join(__dirname, './index.html');
  res.sendFile(filepath);
});

app.route('/cats')
  .get((req, res)=>{
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

  app.put('/cats/:id', (req, res) =>{
    Cat.update(req.body, req.params.id, err =>{
       if(err){
        res.status(400).send(err);
      }else{
        res.send();
      }
    });
  });

//GET /cats/5 using .get
// app.get('/cats/:id', (req, res)=>{   // ":" means it's dynamic and will be in params under that key
// //makes a route with url params
//   console.log('req.params.id:', req.params);
//   res.send('one cat!');
// });

app.route('/cats/:id')
  .get((req, res) => {
     //GET /cats/5  - get one cats
    res.send(`Here is cat #${req.params.id}!`);
})
  .put((req, res) => {
    Cat.update(req.body, req.params.id, err =>{
       // cat.name = req.body.name;
      // cat.type = req.body.type;
      // cat.color = req.body.color;
      if(err) return res.status(400).send(err);
    })
    //PUT /cats/5  - update one cats
    // res.send(`Editing cat #${req.params.id}!`);
    res.send();
   
})
  .delete((req, res) => {
    //DELETE /cats/5  - delete one cats
    // res.send(`Deleting cat #${req.params.id}!`);
    Cat.delete(req.body.id, err =>{
      if(err) return res.status(400).send(err);
    })
    res.send();
    // res.redirect("/");
});

//Timestamp Route
app.get('/timestamp', (req, res) => {
  res.send({timestamp: Date.now() }); //Date has to be wrapped in an object
});



app.listen(PORT, err => {
  console.log(err ||  `Server listening on port ${PORT}`);   
                                                          
                                                          
});                                                     