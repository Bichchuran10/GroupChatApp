const sequelize=require('../util/database.js');
const Sequelize=require('sequelize');

const Message=sequelize.define('message',{

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    },
    from: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports=Message;