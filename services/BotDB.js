const Clientsv2 = require("../database/models/Client");
const Gupshupsv2 = require("../database/models/Gupshup");
const StageClientsv2 = require("../database/models/StageClients");
const WelcomeOptionsv2 = require("../database/models/WelcomeOptions");

class BotDB{
    constructor(){
    }

    clienteExisteBD = async function(whatsapp, company) {
        const queryUser = await Clientsv2.findOne({
          where: { client_wpp: whatsapp, client_organization_ident: company },
        });
        if (!queryUser) {
          console.log("entra al if");
          return {
            status: false,
            client: {},
          };
        } else {
          console.log("entra al else");
          console.log(queryUser);
          return {
            status: true,
            client: queryUser,
          };
        }
      };
}

module.exports = BotDB