// Example used: https://coolaj86.com/articles/upload-to-s3-with-node-the-right-way/

const AWS = require("aws-sdk");
require("dotenv").config();

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const fs = require("fs");

function uploadToS3(bucketName, keyPrefix, filePath) {
    const fileName = filePath;
    const fileStream = fs.createReadStream(filePath);

    const keyName = keyPrefix + "/" + filePath;

    return new Promise(function(resolve, reject) {
        fileStream.once("error", reject);
        s3.upload(
            {
                Bucket: bucketName,
                Key: keyName,
                Body: fileStream
            },
            function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            }
        );
    });
}

uploadToS3(process.env.BUCKET, "pictures", "test.png").then(function(result){
  console.log("Done: File is at " + result.Location);
}).catch(function(err) {
  console.log("Error: " + err);
});