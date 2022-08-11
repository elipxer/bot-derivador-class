const {DataTypes,Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const WelcomeOptionsv2 = sequelize.define('welcomeoptions',{
    option_ident: DataTypes.STRING,
    option: DataTypes.STRING,
    sector: DataTypes.STRING
});

module.exports = WelcomeOptionsv2