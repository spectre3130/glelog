const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'ap-northeast-2'
});
exports.avatar = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const ext = file.originalname.split('.').pop();
            if(this.deleteS3Dir(`user/${String(req.user._id)}`)) {
                cb(null, `user/${String(req.user._id)}/${Date.now()}-avatar.${ext}`);
            } 
        }
    }),
});

exports.post = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const { _id } = req.query;
            cb(null, `post/${_id}/contents/${Date.now()}-${file.originalname}`);
        }
    }),
});

exports.thumb = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const { _id } = req.query;
            if(this.deleteS3Dir(`post/${_id}/thumb`)) {
                cb(null, `post/${_id}/thumb/${Date.now()}-${file.originalname}`);
            } 
        }
    }),
});

exports.deleteS3Dir = async (path) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Prefix: `${path}`
    }
    const s3Objects = await s3.listObjectsV2(params).promise();

    if (s3Objects.Contents.length === 0) {
        return true;
    }

    await s3.deleteObjects({
        Bucket: params.Bucket,
        Delete: { 
            Objects: s3Objects.Contents.map(({ Key }) => { return { Key } }) 
        }
    }).promise();
    
    return true;
}

exports.syncPostImages = async (_id, images) => {
    if(!images || !images.length) {
        return;
    }
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Prefix: `post/${_id}/contents`
    }
    const s3Objects = await s3.listObjectsV2(params).promise();
    for (const s3Object of s3Objects.Contents) {
        if(images.indexOf(String(s3Object.Key)) === -1) {
            await s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: s3Object.Key
            }).promise();
        }
    }
}