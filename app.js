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
const Group = require('./models/Group');
const GroupUser = require('./models/GroupUser');

//association
User.hasMany(Message)
Message.belongsTo(User)

Group.belongsToMany(User, {through: GroupUser});
User.belongsToMany(Group, {through: GroupUser});

Group.hasMany(Message);
Message.belongsTo(Group);

//routers
const userRouter=require('./routes/user')
const messageRouter=require('./routes/message')
const chatRouter = require('./routes/chat');
const adminRouter = require('./routes/admin');

app.use(cors());
app.use(bodyParser.json({ extended: false }));


app.use('/user',userRouter)
app.use('/message',messageRouter)
app.use('/chat', chatRouter)
app.use('/admin', adminRouter);


sequelize.
//sync({force:true})
sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err))
