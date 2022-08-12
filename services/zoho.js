const axios = require('axios');

class Zoho{
    constructor(){
        this.refresh_token=process.env.REFRESH_TOKEN;
        this.client_id=process.env.CLIENT_ID;
        this.client_secret=process.env.CLIENT_SECRET;
        this.token='';
    }
    getToken=async function(){
        const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${this.refresh_token}&client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=refresh_token`;
        await axios({
            method:'post',
            url
        }).then(
            (response)=>{
                this.token=response?.data?.access_token;
                console.log("ACCESS TOKEN GUARDADO",this.access_token);
            }
        ).catch(
            (response=>{
                console.log(response);
            })
        )
        return true;
    }

    insertaSibila = async function(fields){
        let bodData = {
            "Company": fields.company,
            "Last_Name": "PRUEBA",
            "First_Name": fields.firstName,
            "Lead_Source": "prueba",
            "Whatsapp":"SMS",
            "Mobile":fields.mobile,
            "Sector":fields.sector,
            "TEST_BOT":fields.botOption
        }
        const body = {
            data:[bodData],
            trigger:["approval","workflow","blueprint"]
        }
        const finalBody = JSON.stringify(body);
        const url = 'https://www.zohoapis.com/crm/v2/Leads';
        const resp= await axios({
            method:'post',
            url,
            data:body,
            headers:{'Authorization':`Zoho-oauthtoken ${this.token}`}
        }).then((response)=>{
            const zohoData = {
                Mobile:fields_mobile,
                Wwner:{
                    id:response.details.Created_By.id
                },
                id:response.details.id,
                Full_Name: fields.firstName,
            }
            zohoData[Sector] = fields.company;
            console.log("then await axios zoho",zohoData);
            return zohoData;
        }).catch((response)=>{
            console.log("catch await axios zoho",response);
            return null;
        });
        return resp;
    }

}

module.exports = Zoho