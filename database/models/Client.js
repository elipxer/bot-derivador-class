const {DataTypes,Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const Clientsv2 = sequelize.define('clients', {
    client_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msj: 'The uuid must to be unique'
        }
    },
    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client_email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:{
            msj: 'The email must to be unique'
        }
    },
    client_crm_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            msj: 'The crm id must to be unique'
        }
    },
    client_crm_id_contact: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:{
            msj: 'The crm id must to be unique'
        }
    },
    client_wpp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    client_instagram: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:{
            msj: 'The instagram username must to be unique'
        }
    },
    client_instagram_identifier: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:{
            msj: 'The instagram username must to be unique'
        }
    },
    client_sms: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    client_telegram: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    client_facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    client_organization_ident: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    client_opt_in: {
        type: DataTypes.STRING,
        allowNull: true
    },
    client_menu_response: {
        type: DataTypes.STRING,
        allowNull: true
    },
    client_bot_last_code:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

module.exports = Clientsv2