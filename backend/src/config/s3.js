const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region : 'ap-northeast-2'
});

exports.avatar = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'glelog/avatar',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, String(req.user._id));
        }
    }),
});

exports.post = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'glelog/post',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const { _id } = req.query;
            cb(null, `${_id}/${file.originalname}`);
        }
    }),
});

exports.thumb = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'glelog/post',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const { _id } = req.query;
            cb(null, `${_id}/thumb`);
        }
    }),
});