require('dotenv').config() 
require('./connection')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/userRoutes')
const templateRoutes = require('./routes/templateRoutes')
const chatgptRoutes = require('./routes/chatgptRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
var fs = require('fs');
const stripeController2 = require('./controllers/stripeController2');




app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});
const corsOptions ={
    origin:'https://main--sweet-halva-a45e9f.netlify.app', 
    // origin: 'http://localstorage:8000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use('/uploads', express.static('uploads'));

app.use(cors(corsOptions));
app.post('/webhook', express.raw({ type: 'application/json' }),stripeController2.handleWebhook);
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) 
app.use(stripeRoutes)
app.use(userRouter)
app.use(templateRoutes)
app.use(chatgptRoutes)
app.use(express.json());


app.set('etag', false);

app.get("/", (req, res) =>{
  res.send('<h1>Problem Pro</h1>');
});

app.listen(process.env.PORT_NEW, () => {
  console.log(`server running at http://127.0.0.1:${process.env.PORT_NEW}`)
})

