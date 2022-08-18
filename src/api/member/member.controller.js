import MemberService from './member.serivce';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
let MemberServiceInstance = Container.get(MemberService);
export default [
  /**
   * @title /member
   * @method POST
   * @description 사원 정보 입력
   * @param { member_login_id, member_login_pw, member_nm, member_div } body
   */
  {
    path: '/member',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await MemberServiceInstance.insertMember(req.body);
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
  /**
   * @title /member
   * @method GET
   * @description 사원 목록 조회
   * @param {}
   */
  {
    path: '/member',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await MemberServiceInstance.getMemberList();
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
  /**
   * @title /member/:company_id
   * @method GET
   * @description 회사별 사워 조회
   * @param {company_id} params
   */
  {
    path: '/member/:company_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await MemberServiceInstance.getMember(company_id);
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
  /**
   * @title /member/:company_id/:member_id
   * @method GET
   * @description 사원 상세 조회
   * @param {company_id, member_id} params
   */
  {
    path: '/member/:company_id/:member_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await MemberServiceInstance.getMemberDetail(
          req.params
        );
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

  /**
   * @title /member
   * @method PUT
   * @description 사원 정보 수정
   * @param {member_id, member_login_id, member_login_pw, member_nm, member_div, use_yn} body
   */
  {
    path: '/member',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await MemberServiceInstance.updateMember(req.body);
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
  /**
   * @title /member
   * @method DELETE
   * @description 사원 정보 삭제
   * @param {member_id, member_login_id, member_login_pw} body
   */
  {
    path: '/member',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await MemberServiceInstance.deleteMember(req.body);
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
];
