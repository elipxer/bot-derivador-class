const { request, response } = require("express");
const BotDerivador = require('../services/BotDerivador');
const BotDB = require('../services/BotDB');
const Zoho = require('../services/zoho');

const recibeMensaje = async (req = request, res = response) => {
  const company = "TIVENOS Education";
  const app = "BehindUEducation";
  const botDB = new BotDB();
  const zoho = new Zoho();
  if (req?.body?.type === "message") {//valida si llega un mensaje
    console.log("MENSAJE RECIBIDO: ", req.body);
    const origen = req?.body?.payload?.sender?.phone || "0000000";
    const nombre = req?.body?.payload?.sender?.name || "nadie";
    const contenido = req?.body?.payload?.payload?.text || "";
    try {//valida si existe el cliente en la base de datos
      const queryUserDB = await botDB.clienteExisteBD(origen,company);
      if (queryUserDB.status) {//SÍ EXISTE EN LA BASE DE DATOS
        console.log("OUT: usuario existe en BD de clientes", queryUserDB.client);
        return res.status(200).json({ msg: "OUT: usuario existe en BD de clientes" });
      }
      else if(origen !== "0000000" && nombre !== "nadie"){//AQUI REALMENTE EMPIEZA LA IMPLEMENTACIÓN DEL BOT
        console.log("IMPLEMENTACIÓN DEL BOT");
        const bot_derivador = new BotDerivador(origen,nombre,app,contenido);
        const consultaBot = await bot_derivador.validaBotPrendido();
        if (consultaBot) {
          console.log("MARCA TIENE BOT PRENDIDO");//LA MARCA/SECTOR TIENE EL BOT PRENDIDO
          const queryStageClient = await bot_derivador.buscaClienteStageClients();
          const queryOptions = await bot_derivador.buscaWelcomeOptionsApp();
          if(queryStageClient!==null){//Encuentra al cliente en la tabla de stage clients
            console.log("Se encuentra cliente stage client");//Si encuentra al cliente en la tabla de stageClient
            const queryValida = await bot_derivador.validaRespuestaCliente(contenido);
            if(queryValida){
            await zoho.getToken();
            const fields = {
              company,
              firstName:nombre,
              mobile:origen.split('+').join(''),
              sector:app,
              botOption:bot_derivador.getSelectedOption
            }
            const queryZoho = await zoho.insertaCRM(fields);
            console.log("QUERY INSERT ZOHO",queryZoho);
            const querySibila = await zoho.insertaSibila(queryZoho,fields);
            const queryBorraStage = await bot_derivador.removeStageClient();
            return res.status(200).send("Hemos recibido su respuesta, en breve nos contactaremos con usted.");
            }else{
              console.log("No es respuesta esperada");
              return res.status(200).send(bot_derivador.getMensaje);
            }
          }else{//Si no encuentra al cliente en la tabla de stageClient
            console.log("no está en stage clients");
            const insertClientStage = await bot_derivador.insertaClienteStageClient();
            return res.status(200).send(bot_derivador.getMensaje);
          }
        } else {//LA MARCA NO TIENE EL BOT PRENDIDO
          console.log("La marca no tiene el bot prendido");
          return res.status(200).send("La marca no tiene el bot prendido");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Hubo un error, contactar al admin" });
    }
  }
  return res.status(200).send("Mensaje recibido.");
};

module.exports = {
  recibeMensaje,
};