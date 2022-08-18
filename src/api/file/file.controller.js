import S3Manager from '../../utils/S3Manager';
import models from '../../models';
import FileService from './file.service';
import { Container } from 'typedi';

let FileServiceInstance = Container.get(FileService);

export default [
  /**
   * 파일업로드
   * --
   */
  {
    path: '/upload',
    method: 'post',
    middleware: [],
    file: 'multiple',
    controller: (req, res, next) => {
      try {
        const S3 = new S3Manager();

        // 성공시 실행 핸들러
        const successHandller = async (resultData) => {
          const { result } = resultData;
          // await models.fileList.create();
          return res.status(200).json({
            resultCode: 200,
            resultMessage: 'success',
            resultData: result,
          });
        };

        // 실패시 실행 핸들러
        const errorHandller = (resultData) => {
          return res.status(500).json({
            resultCode: 500,
            resultMessage: 'Error',
            resultData,
          });
        };

        S3.uploads('upload', req.files, successHandller, errorHandller);
      } catch (error) {
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
      // req.files.forEach((file, index) => {
      //   S3.upload('upload', file.buffer, (f) => {
      //     // 업로드 완료시
      //     if (filesLength === index) {
      //       return res.status(200).json({
      //         resultMessage: 'success',
      //         file: req.file,
      //       });
      //     } // if
      //   }); // upload
      // }); // forEach
    },
    // controller: (req, res, next) => {
    //   const $S3 = new S3Manager();
    //   $S3.createFolder('upload', req.file.buffer, (f) => {
    //     console.log('fileupload result: ', f);
    //     return res.status(200).json({
    //       resultMessage: 'success',
    //       file: req.file,
    //     });
    //   });
    // },
  },
  {
    path: '/upload/parser/:company_id',
    method: 'post',
    middleware: [],
    file: 'multiple',
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const params = {
          company_id,
          file: req.files,
        };
        const resultData = await FileServiceInstance.excelParserUpload(params);

        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
  {
    path: '/upload/agreement/:company_id',
    method: 'post',
    middleware: [],
    file: 'multiple',
    controller: (req, res, next) => {
      try {
        const S3 = new S3Manager();

        // 성공시 실행 핸들러
        const successHandller = async (resultData) => {
          const { result } = resultData;
          // console.log(result);
          return res.status(200).json({
            resultCode: 200,
            resultMessage: 'success',
            result,
          });
        };

        // 실패시 실행 핸들러
        const errorHandller = (resultData) => {
          return res.status(500).json({
            resultCode: 500,
            resultMessage: 'Error',
            resultData,
          });
        };

        S3.uploads('agreement', req.files, successHandller, errorHandller);
      } catch (error) {
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
];
