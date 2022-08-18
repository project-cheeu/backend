/**
 * S3Manager
 * --
 * 파일관리 객체
 *
 */
import AWS from 'aws-sdk';
import guidGenerator from '../utils/guidGenerator';
import { logger } from './winstonLogger';

export default class S3Manager {
  /**
   * 생성자
   */
  constructor() {
    // 싱글톤으로 생성
    this.bucketName = process.env.BUCKET_NAME;
    AWS.config.update({
      accessKeyId: `${process.env.ACCESS_KEY}`,
      secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
      region: `${process.env.REGION}`,
    });
    this.S3 = new AWS.S3({ apiVersion: '2006-03-01' });
    // if (!S3Manager.instance) {
    //   this.bucketName = process.env.BUCKET_NAME;
    //   this.S3 = new AWS.S3({ apiVersion: '2006-03-01' });

    //   S3Manager.instance = this;
    // }
    // return S3Manager.instance;
  }

  /**
   * REVIEW
   * 업로드
   * --
   */
  upload(folderName = 'upload', file, callback = null, errorHandller = null) {
    try {
      // 키 생성
      const guid = guidGenerator();
      const params = {
        Bucket: `${process.env.BUCKET_NAME}`,
        Key: `${folderName}/${guid}`,
        Body: file,
        // ContentType: 'image/png',
      };

      // S3로 업로드
      this.S3.upload(params, (uploadError, data) => {
        // console.log('result2: ', data);
        if (uploadError) {
          // console.log(uploadError);
          logger.error(`[S3Manager][upload] Error: ${uploadError.message}`);
          if (errorHandller) {
            errorHandller(uploadError);
          } else {
            return null;
          }
        } else {
          // return folderName;
          if (callback) {
            return callback(params.Key);
          }
        }
      });
    } catch (error) {
      errorHandller(error);
    }
  } // close func

  /**
   * 멀티업로드
   * --
   */
  uploads(
    folderName = 'upload',
    files = [],
    callback = null,
    errorHandller = null
  ) {
    if (files.length < 1) {
      return null;
    }

    const filesLength = files.length - 1;
    let result = [];

    // 파일목록 반복
    files.forEach((file, index) => {
      this.upload(
        folderName,
        file.buffer,
        // 성공콜백
        (f) => {
          result.push(f);
          // 업로드 완료시
          if (filesLength === index) {
            if (callback) {
              callback({ file, result });
            } else {
              return { file, result };
            }
          }
        },
        // 에러핸들러
        (err) => {
          if (errorHandller) {
            errorHandller(err);
          } else {
            return err;
          }
        }
      ); // upload
    }); // forEach
  }

  /**
   *
   */
  deleteObject(Key, successHandller = null, errorHandller = null) {
    const params = {
      Bucket: 'store.dsu2020.com',
      Key,
    };

    // console.log(params);

    // 삭제로직
    this.S3.deleteObject(params, (err, data) => {
      if (err) {
        // console.log('err: ', err);
        if (errorHandller) errorHandller(err);
        else return err;
      } else {
        if (successHandller) successHandller(data);
        else return data;
      }
    });
  }

  /**
   *
   */
  deleteObjects(keys = [], successHandller = null, errorHandller = null) {
    const params = {
      Bucket: 'store.dsu2020.com',
      Delete: {
        Objects: keys,
        Quiet: false,
      },
    };

    // 삭제로직
    this.S3.deleteObjects(params, (err, data) => {
      if (err) {
        // console.log('err: ', err);
        if (errorHandller) errorHandller(err);
        else return err;
      } else {
        if (successHandller) successHandller(data);
        else return data;
      }
    });
  }

  /**
   *
   */
  createFolder(folderName, file, callback = null) {
    const guid = guidGenerator();
    // console.log('guid : ', guid);
    // console.log('this.bucketName : ', this.bucketName);
    this.S3.upload(
      {
        Bucket: `${process.env.BUCKET_NAME}`,
        Key: `${folderName}/${guid}`,
        // Key: `upload/${guid}/`,
        // Key: `${guid}/`,
        Body: file,
        // Body: file ? file : 'body does not matter',
      },
      (err2, data) => {
        // console.log('result2: ', data);
        if (err2) {
          logger.error(`[AWS][s3.getObject] Error: `, err2);
          return null;
        } else {
          // return folderName;
          if (callback) {
            callback(folderName);
          }
        }
      }
    );
  } // close func
}
