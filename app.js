const express=require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const cors=require('cors')

//models
const User=require('./models/User')

//routers
const userRouter=require('./routes/user')

app.use(cors());
app.use(bodyParser.json());


app.use('/user',userRouter)

sequelize.sync({force:true})
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err))
