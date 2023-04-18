const express=require('express')

const cors=require('cors')
const dotenv = require('dotenv');
dotenv.config();
const path = require('path')
const bodyParser=require('body-parser')
const sequelize=require('./util/database')



//models
const User=require('./models/User')
const Message=require('./models/Message')
const OneToOne=require('./models/OneToOne')
const Group = require('./models/Group');
const GroupUser = require('./models/GroupUser');

//routers
const userRouter=require('./routes/user')
const messageRouter=require('./routes/message')
const chatRouter = require('./routes/chat');
const adminRouter = require('./routes/admin');


const app = express();


const http = require('http').createServer(app)


const io = require('socket.io')(http, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('sockkkkk',socket)
    console.log("haha socket id",socket.id)

    // Listen for chat messages
    socket.on('chatMessage', ({ from, to, message, chat }) => {
        // Broadcast the message to all users in the chat room
        socket.to(getRoomName(from, to)).emit('chatMessage', { chat, message });
    });

     // Join a chat room
     socket.on('joinChat', ({ from, to }) => {
        socket.join(getRoomName(from, to))
    });

})
function getRoomName(from, to) {
    // Generate a unique name for the chat room
    return `${Math.min(from, to)}:${Math.max(from, to)}`;
}


app.use(cors({
    origin: ['http://127.0.0.1:5500'],
    credentials: true
}))
//app.use(cors())
app.use(express.static(path.join(__dirname, 'public/Chat')));

//association
User.hasMany(Message)
Message.belongsTo(User)

User.hasMany(OneToOne)
OneToOne.belongsTo(User)

Group.belongsToMany(User, {through: GroupUser});
User.belongsToMany(Group, {through: GroupUser});

Group.hasMany(Message);
Message.belongsTo(Group);







app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use('/user',userRouter)
app.use('/message',messageRouter)
app.use('/chat', chatRouter)
app.use('/admin', adminRouter);



sequelize.
//sync({force:true})
sync()
.then(()=>{
    http.listen(3000)
})
.catch(err=>console.log(err))
