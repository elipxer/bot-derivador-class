const {DataTypes,Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const Agentsv2 = sequelize.define('agents',{
        agent_uuid:{
            type: DataTypes.STRING,
            allowNull: true,
            unique:{
                msj:"The uuid must to be unique"
            }
        },
        agent_username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:{
                msj:"The usename must to be unique"
            }
        },
        agent_crm_id:{
            type: DataTypes.STRING,
            defaultValue: 'general',
            allowNull: true,
            unique:{
                msj:"The crm_id must to be unique"
            }
        },
        agent_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:{
                msj:"The email must to be unique"
            }
        },
        agent_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_permission: {
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_connected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: 0
        },
        agent_profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            default: 'default'
        },
        connected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        connect_to_call: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        ready_to_call: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        next_to_call: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        call_ident_out:{
            type: DataTypes.STRING,
            allowNull: true,
            default: 'default'
        },
        call_ident_in: {
            type: DataTypes.STRING,
            allowNull: true,
            default: 'default'
        },
        companyId:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
});

module.exports = Agentsv2