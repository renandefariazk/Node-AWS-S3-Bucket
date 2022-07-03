const awsService = require("../services/awsService");

const getFileUrlSigned = async (req, res) =>{
  try{
    const keyName = req.params.keyName;
    const urlFile = await awsService.getFileUrlSigned(keyName);
    res.status("200").send(urlFile);
  } catch(error){
    res.status("500").send(error);
  }
}

const addFile = async (req, res) =>{
  try{
    const name = req.body.name;
    const file = req.files.fileImage;
    const url = await awsService.addFile(name, file);
    if(url){
      res.status("200").send({result: "File Adicionado"});
    }
  }catch(error){
    res.status("500").send(error);
  }
}

module.exports = {getFileUrlSigned, addFile};