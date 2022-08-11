const {DataTypes,Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const StageClientsv2 = sequelize.define('stageclients', {
    client_name: DataTypes.STRING,
    client_wpp:DataTypes.STRING,
    client_instagram_identifier:DataTypes.STRING,
    client_sms:DataTypes.STRING,
    client_telegram:DataTypes.STRING,
    client_facebook:DataTypes.STRING,
    client_organization_ident:DataTypes.STRING,
    client_profile_image:DataTypes.STRING,
    client_menu_response: DataTypes.STRING

});

module.exports = StageClientsv2