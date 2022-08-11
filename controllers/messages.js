const { request, response } = require("express");
const BotDerivador = require('../services/BotDerivador');
const BotDB = require('../services/BotDB');

const recibeMensaje = async (req = request, res = response) => {
  const company = "TIVENOS Education";
  const app = "BehindUEducation";
  const botDB = new BotDB();
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
      } else if(origen !== "0000000" && nombre !== "nadie"){//AQUI REALMENTE EMPIEZA LA IMPLEMENTACIÓN DEL BOT
        const bot_derivador = new BotDerivador(origen,nombre,app,contenido);
        const consultaBot = await bot_derivador.validaBotPrendido();
        if (consultaBot) {//LA MARCA/SECTOR TIENE EL BOT PRENDIDO
          const queryStageClient = await bot_derivador.buscaClienteStageClients();
          const queryOptions = await bot_derivador.buscaWelcomeOptionsApp();
          if(queryStageClient!==null){//Si encuentra al cliente en la tabla de stageClient
            const queryValida = await bot_derivador.validaRespuestaCliente(contenido);
            if(queryValida){
            //lo inserta en sibila
            //lo inserta en el crm
            const queryBorraStage = await bot_derivador.removeStageClient();
            console.log("query borrado",queryBorraStage);
            return res.status(200).send("Hemos recibido su respuesta, en breve nos contactaremos con usted.");
            }else{
              return res.status(200).send(bot_derivador.getMensaje);
            }
          }else{//Si no encuentra al cliente en la tabla de stageClient
            const insertClientStage = await bot_derivador.insertaClienteStageClient();
            return res.status(200).send(bot_derivador.getMensaje);
          }
          /*
          if(query){//EL CLIENTE SE ENCUENTRA EN STAGE 
            let flagResponse = false;
                return res.status(200).send("Gracias, hemos recibido su respuesta. En breve nos pondremos en contacto con usted.");
              }
            }*/
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
};

module.exports = {
  recibeMensaje,
};