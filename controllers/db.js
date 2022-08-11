const {request,response} = require('express');
const Companiesv2 = require('../database/models/Company');
const WelcomeOptionsv2 = require('../database/models/WelcomeOptions')

const traerCompanies = async(req=request,res=response)=>{
    const test = await Companiesv2.findAll();
    if(!test){
        return res.status(500).json({msg:"Hubo un error, contacta al admin"});
    }
    res.status(200).json({test});
}

const traerWelcomeOptions = async (req=request,res=response)=>{
    try{
        const companies = await dbCompany.findAll();
        const query = await WelcomeOptionsv2.findAll();
       return res.status(200).json(query);
    }catch(err){
        console.log(err);
    }
    res.status(500).json({msg:"Hubo un error, buscar al admin"});

}

module.exports = {
    traerCompanies,
    traerWelcomeOptions
}