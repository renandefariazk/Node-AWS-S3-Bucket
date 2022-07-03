const AWS = require("aws-sdk");

const BucketName = process.env.AWS_S3_BUCKET_NAME;
const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFileS3 = async (file_name, fileStream, prefix) => {
  // const FileName = file_name.split('/')[file_name.split('/').length-1];
  const FileName = file_name;
  const Key = prefix ? prefix + FileName : FileName;

  const params = {
    Bucket: BucketName,
    Key,
    Body: fileStream,
  };

  try {
    return new Promise((resolve, reject) => {
      S3.upload(params, function (error, data) {
        if (error) {
          reject(error);
        }
        resolve(data.Location);
      });
    });
  } catch (error) {
    throw new Error("Erro ao salvar o arquivo, tente novamente", 400);
  }
}

const getTemporaryLinkFromS3 = async (fileName, expireMinutes) => {
  // const Key = url.split('/')[url.split('/').length-1];
  const Key = fileName;

  const Expires = 60 * (expireMinutes || 10);

  const params = {
    Bucket: BucketName,
    Key,
    Expires,
  };

  try {
    return await new Promise((resolve, reject) => {
      S3.getSignedUrl('getObject', params, async (err, url) => {
        resolve(url);
      });
    });
  } catch (error) {
    throw new Error("Erro na geração do link do arquivo: "+ error.message, 400);
  }
}


module.exports = {uploadFileS3, getTemporaryLinkFromS3};