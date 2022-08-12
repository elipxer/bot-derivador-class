const Clientsv2 = require("../database/models/Client");
const Gupshupsv2 = require("../database/models/Gupshup");
const StageClientsv2 = require("../database/models/StageClients");
const WelcomeOptionsv2 = require("../database/models/WelcomeOptions");

class BotDerivador {
  constructor(origen,nombre,app,contenido) {
      this.origen = origen;
      this.nombre = nombre;
      this.contenido = contenido;
      this.app = app;
      this.options = [];
      this.mensaje = '';
      this.selectedOption=null;
  }

  get getSelectedOption(){
    return this.selectedOption;
  }

  set setSelectedOption(option){
    this.selectedOption=option;
  }

  get getMensaje(){
    return this.mensaje;
  }

  set setMensaje(mensaje){
    this.mensaje=mensaje;
  }
  validaBotPrendido = async function () {
    const cuentaGupshup = await Gupshupsv2.findOne({
      where: {
        bot_derivador: 1,
        gupshup_app:this.app,
      },
    });
    console.log("cuenta Gupshup query",cuentaGupshup);
    if(cuentaGupshup !== null) return true;
    else return false;
  };

  buscaClienteStageClients = async function () {
    const query = await StageClientsv2.findOne({
      where: {
        client_wpp: this.origen,
        client_organization_ident: this.app
      }
    });
    if(query!==null) return query;
    else return null;
  };

  insertaClienteStageClient = async function () {
    const query = await StageClientsv2.create({
      client_name: this.nombre,
      client_wpp: this.origen,
      client_organization_ident: this.app,
      client_sms:this.origen,
      client_telegram:this.origen
    });
    console.log("inserta cliente stage client",query);
    return query;
  };

  buscaWelcomeOptionsApp = async function () {
    const query = await WelcomeOptionsv2.findAll({
      where: {
        sector: this.app,
      },
    });
    if(query !== null){
        this.options = await this.guardaMensajes(query);
        await this.armaMensaje();
    }
    return query;
  };

  guardaMensajes = async function(query){
    const mensajesValues = query.map(s=>{
        return {
            id: s.dataValues.id,
            option_ident:Number(s.dataValues.option_ident),
            option: s.dataValues.option
        }
    });
    mensajesValues.sort((a,b)=>{
        return a.option_ident - b.option_ident;
    });
    console.log(mensajesValues);
    return mensajesValues;
  }

  armaMensaje = async function(){
    let mensaje = "PLANTILLA de mensaje personalizable\n";
    this.options.forEach(m=>{
        mensaje += `${m.option_ident}. ${m.option}\n`;
    });
    mensaje += 'Por favor introduce el número de la opción: ';
    this.mensaje = mensaje;
    return true;
  }

  validaRespuestaCliente=async function(respuesta){
    let flag = false;
    this.options.forEach(option=>{
        if(respuesta.includes(option.option_ident)){
            console.log("Encontró un match");
            this.selectedOption=option.option_ident;
            flag = true;
            return flag;
        }
    });
    return flag;
  }

  removeStageClient = async function (whatsapp, app) {
    const query = await StageClientsv2.destroy({
      where: {
        client_wpp: this.origen,
        client_organization_ident: this.app,
      },
    });
    return query;
  };
}

module.exports = BotDerivador