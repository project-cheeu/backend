import AWS from 'aws-sdk';

// S3 인스턴스 생성
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const bucketName = process.env.BUCKET_NAME;

/**
 * 러닝환경별 폴더 생성
 * --
 */
export const createFolder = (folderName, callback = null) => {
  // 검색 파라미터
  const params = {
    Bucket: bucketName,
    Key: `${folderName}/`,
    // Prefix: '1d0d8e3c-cf8b-c043-50fe-26f8aead32f2.m3u8'
    // Range: 'bytes=0-9'
  };

  // 폴더존재여부 조회
  s3.getObject(params, (err) => {
    if (err) {
      // 폴더가 없을경우 생성
      s3.upload(
        {
          ...params,
          Body: 'body does not matter',
        },
        (err2) => {
          if (err2) {
            // logger.error(`[AWS][s3.getObject] Error: `, err2);
            console.log('[createFolder] Error: ', err2);
            return null;
          } else {
            // return folderName;
            if (callback) {
              callback(folderName);
            }
          }
        }
      );
    } else {
      if (callback) {
        callback(folderName);
      }
    }
  });
};

/**
 * 버킷목록 조회
 * --
 * The following example return versions of an object with specific key name prefix.
 * The request limits the number of items returned to two.
 * If there are are more than two object version, S3 returns NextToken in the response.
 * You can specify this token value in your next request to fetch next set of object versions.
 */
export const listBuckets = () => {
  const params = {};

  return new Promise((resolve, reject) => {
    s3.listBuckets(params, (err, data) => {
      // 요청이 성공하면 err은 null이며, data를 받아옴
      err ? reject(err) : resolve(data);
    });
  });
};
