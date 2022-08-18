import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import CompanyVideoService from './company.video.service';
let CompanyVideoServiceInstance = Container.get(CompanyVideoService);

export default [
  /**
   * [POST] 영상 등록
   * --
   */
  {
    path: '/video',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyVideoServiceInstance.insertCompanyVideo(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          resultMessage: 'failed',
          resultData: error,
        });
      }
    },
  },
  /**
   * [GET] 영상 정보 조회
   * --
   */
  {
    path: '/video/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await CompanyVideoServiceInstance.getCompanyVideoList(req.params);
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          resultMessage: 'failed',
          resultData: error,
        });
      }
    },
  },
  /**
   * [PUT] 영상 정보 수정
   * --
   */
  {
    path: '/video',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyVideoServiceInstance.updateCompanyVideo(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          resultMessage: 'failed',
          resultData: error,
        });
      }
    },
  },
  /**
   * [DELETE] 영상 정보 삭제
   * --
   */
  {
    path: '/video',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyVideoServiceInstance.deleteCompanyVideo(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          resultMessage: 'failed',
          resultData: error,
        });
      }
    },
  },
];
