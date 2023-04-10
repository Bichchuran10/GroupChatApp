const express=require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser=require('body-parser')
const sequelize=require('./util/database')
const cors=require('cors')

//models
const User=require('./models/User')
const Message=require('./models/Message')

//association
User.hasMany(Message)
Message.belongsTo(User)

//routers
const userRouter=require('./routes/user')
const messageRouter=require('./routes/message')


app.use(cors());
app.use(bodyParser.json({ extended: false }));


app.use('/user',userRouter)
app.use('/message',messageRouter)

sequelize.
//sync({force:true})
sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err))
