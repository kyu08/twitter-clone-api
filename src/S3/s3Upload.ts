import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';

require('dotenv').config();

AWS.config.logger = console; // 通信のデバッグ用。不要であれば削除可。

export const uploadToS3 = (userId: string, image: any) => {
  const accessKeyId = process.env.ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY;
  const bucketName = process.env.BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !bucketName)
    throw new Error('erorrrrrr;');

  const fileName = `${userId}.png`;
  const path = `userImage/${fileName}`;
  const body = image;

  const bucket = new S3({
    accessKeyId,
    secretAccessKey,
    region: 'ap-northeast-1',
  });
  const param: S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: path, // ファイル絶対パス
    Body: body, // ファイルの内容
    ACL: 'public-read', // インターネットから誰でもダウンロードできるように
    ContentType: 'image/png',
  };
  bucket.upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Successfully uploaded file.', data);
    }
  });
};
