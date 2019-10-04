const AWS = require("aws-sdk");
require("dotenv").config();


const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

S3.deleteObject({Bucket: process.env.BUCKET, Key: "pictures/test.png"}, (err, res) => {
  if(err)
    return console.log(err);

  console.log("Success");
});