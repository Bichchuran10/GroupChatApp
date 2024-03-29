const sequelize=require('../util/database')
const Sequelize=require('sequelize')

const OneToOne=sequelize.define('onetoone',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    receiverId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    message:{
        type: Sequelize.STRING,
        allowNull: false
    },
    timeInMs: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    timeString: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports=OneToOne;