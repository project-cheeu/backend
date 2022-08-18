import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import CompanyNoticeService from './company.notice.service';
let CompanyNoticeServiceInstance = Container.get(CompanyNoticeService);

export default [
  /**
   * [POST] 공지사항 등록
   * --
   */
  {
    path: '/notice',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyNoticeServiceInstance.insertNotice(
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
   * [GET] 병원별 공지사항 조회
   * --
   */
  {
    path: '/notice/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyNoticeServiceInstance.getNoticeList(
          req.params
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
   * [PUT] 공지사항 정보 수정
   * --
   */
  {
    path: '/notice',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyNoticeServiceInstance.updateNotice(
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
   * [PUT] 공지사항 순서 변경
   * --
   */
  {
    path: '/notice/order',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyNoticeServiceInstance.updateNoticeOrder(
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
   * [DELETE] 공지사항 정보 삭제
   * --
   */
  {
    path: '/notice',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyNoticeServiceInstance.deleteNotice(
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
