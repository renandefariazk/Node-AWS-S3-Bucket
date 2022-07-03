const awsRepository = require("../repository/awsRepository");

const getFileUrlSigned = async (keyName) => {
  try{
    const expireMinutes = 10;
    const urlSigned = await awsRepository.getTemporaryLinkFromS3(keyName, expireMinutes);
    return urlSigned;
  }catch(error){
    throw new Error(error.message);
  }
}

const addFile = async (name, file) =>{
  try{
    return await awsRepository.uploadFileS3(name, file); 
  } catch(error){
    throw new Error(error.message);
  }
}

module.exports = {getFileUrlSigned, addFile};