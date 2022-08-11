const {DataTypes,Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const Gupshupsv2 = sequelize.define('gupshups',{
    gupshup_app: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gupshup_identifier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gupshup_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gupshup_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bot_derivador:{
        type:DataTypes.BOOLEAN,
        allowNull: true
    }
});

module.exports = Gupshupsv2