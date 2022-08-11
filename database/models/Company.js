const {DataTypes,Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_DB,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'mysql'
});

const Companiesv2 = sequelize.define('companies',{
    company_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msj: "The uuid should to be Unique"
        }
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msj: "The company name should to be Unique"
        }
    },
    company_country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_plan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    company_locale: {
        type: DataTypes.STRING,
        allowNull: false
    },
    crm: {
        type: DataTypes.STRING,
        defalutValue: null,
        allowNull: true
    },
    company_crm_code:{
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    auto_lead: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    auto_bot: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    auto_agent: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    client_verify_code: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    crm_key: {
        type: DataTypes.STRING,
        allowNull: true
    },
    crm_secret: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token_crm_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token_crm_value: {
        type: DataTypes.STRING,
        allowNull: true
    },
    access_token_crm_value: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token_expire_timestamp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token_bulk_value: {
        type: DataTypes.STRING,
        allowNull: true
    },
    facebook_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telegram_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_sector_spec: {
        type: DataTypes.STRING,
        allowNull: true
    },
    welcomeOptions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Companiesv2