const AWS = require('aws-sdk');
const sharp = require('sharp');
const querystring = require('querystring');
const s3 = new AWS.S3({ 
  region: 'ap-northeast-2' 
});
const BUCKET = 'glelog-images'

function isNotNumber(value) {
  return !(/^[0-9]+$/).test(value);
}

function isBigSize(value) {
  return parseInt(value) > 1980 ? true : false;
}

function isGif(value) {
  return value === 'gif' ? true : false;
}

exports.handler = async (event, context, callback) => {

  const response = event.Records[0].cf.response;
  const request = event.Records[0].cf.request;
  const params = querystring.parse(request.querystring);
  const uri = request.uri;
  const [, imageName, extension] = uri.match(/\/(.*)\.(.*)/);

  if (!params.s || 
      isNotNumber(params.s) || 
      isBigSize(params.s) || 
      isGif(extension)) { 

    callback(null, response);
    return;
    
  }

  const width = parseInt(params.s);
  const requiredFormat = extension === 'jpg' ? 'jpeg' : extension;
  const originalKey = imageName + '.' + extension;

  try {

    const s3Object = await s3.getObject({ 
      Bucket: BUCKET,
      Key: originalKey
    }).promise();

    const metadata = await sharp(s3Object.Body).metadata();
    if(metadata.width <= width) {
      callback(null, response);
      return;
    }

    const resizedImage = await sharp(s3Object.Body).resize({ width })
                              .toFormat(requiredFormat)
                              .toBuffer();

    response.status = 200;
    response.body = resizedImage.toString('base64');
    response.bodyEncoding = 'base64';
    response.headers['content-type'] = [
      { key: 'Content-Type', value: 'image/' + requiredFormat }
    ];
    
    return callback(null, response);

  } catch (e) {
    console.error(e);
    return callback(e);
  }
  
}