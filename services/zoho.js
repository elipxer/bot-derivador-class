const axios = require('axios');
const Agentsv2 = require('../database/models/Agent');
const Clientsv2 = require('../database/models/Client');
const Companiesv2 = require('../database/models/Company');
class Zoho {
  constructor() {
    this.refresh_token = process.env.REFRESH_TOKEN;
    this.client_id = process.env.CLIENT_ID;
    this.client_secret = process.env.CLIENT_SECRET;
    this.token = "";
  }
  getToken = async function () {
    const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${this.refresh_token}&client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=refresh_token`;
    await axios({
      method: "post",
      url,
    })
      .then((response) => {
        this.token = response?.data?.access_token;
        console.log("ACCESS TOKEN GUARDADO", this.token);
      })
      .catch((response) => {
        console.log(response);
      });
    return true;
  };

  insertaCRM = async function (fields) {
    let bodData = {
      Company: fields.company,
      Last_Name: "PRUEBA",
      First_Name: fields.firstName,
      Lead_Source: "prueba",
      Whatsapp: "SMS",
      Mobile: fields.mobile,
      Sector: fields.sector,
      TEST_BOT: fields.botOption,
    };
    const body = {
      data: [bodData],
      trigger: ["approval", "workflow", "blueprint"],
    };
    const finalBody = JSON.stringify(body);
    const url = "https://www.zohoapis.com/crm/v2/Leads";
    const resp = await axios({
      method: "post",
      url,
      data: body,
      headers: { Authorization: `Zoho-oauthtoken ${this.token}` },
    })
      .then((response) => {
        return response.data.data[0].details;
      })
      .catch((response) => {
        console.log("catch await axios zoho", response);
        return null;
      });
    return resp;
  };

  insertaSibila = async function (queryZoho, fields) {
    try {
      //buscar al agente
      console.log(queryZoho?.Created_By?.id);
      const agente = await Agentsv2.findOne({
        where: { agent_crm_id: queryZoho?.Created_By?.id },
      });
      console.log("ENCUENTRA AGENTE",agente)
      const company_temp = await Companiesv2.findByPk(agente.companyId);
      console.log("ENCUENTRA COMPAÑÍA", company_temp);
      const sector = company_temp.company_sector_spec || null;
      console.log("SECTOR", sector);
      //crea al cliente en la bd
      const insert_status = await Clientsv2.create({
        client_uuid: queryZoho.id,
        client_crm_id: queryZoho.id,
        client_wpp: fields.mobile,
        client_sms: fields.mobile,
        client_name: fields.firstName,
        client_email: fields.Email || null,
        client_organization_ident: sector,
      });
      console.log(insert_status);
      //zoho timer updater
      //mongo create
      //agent checker
    } catch (err) {
      console.log(err);
    }
    return true;
  };
}

module.exports = Zoho