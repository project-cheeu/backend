import CompanyService from './company.serivce';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import Alimtalk from '../../utils/alimtalk/alimtalk';
let CompanyServiceInstance = Container.get(CompanyService);
export default [
  /**
   * @title /company/signup
   * @method POST
   * @description 회사 초기설정
   * @param {
   *  company_info{ company_nm,company_tel,company_addr,company_mail,company_num,company_regist_num,created_at,modify_at,use_yn },
   *  dept_info{ dept_nm }
   *  member_info { member_login_id, member_login_pw, member_nm, member_div }
   *  } body
   */
  {
    path: '/company/signup',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyServiceInstance.signupCompany(req.body);
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
   * @title /company
   * @method POST
   * @description 회사 정보 입력
   * @param { company_id,company_nm,company_tel,company_addr,company_mail,company_num,company_regist_num,created_at,modify_at,use_yn } body
   */
  {
    path: '/company',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyServiceInstance.insertCompanyInfo(
          req.body
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
   * @title /company
   * @method GET
   * @description 회사 리스트 조회
   * @param {}
   */
  {
    path: '/company',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyServiceInstance.getCompanyList();
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
   * @title /company/:company_id
   * @method GET
   * @description 회사상세정보 조회 => 회사 정보, 회사 자원 정보
   * @param company_id:String
   */
  {
    path: '/company/:company_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await CompanyServiceInstance.getCompanyDetail(
          company_id
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
   * @title /company
   * @method PUT
   * @description 회사 정보 수정
   * @param { company_id, company_nm, company_tel, company_addr, company_mail } body
   */
  {
    path: '/company',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      const resultData = await CompanyServiceInstance.updateCompanyInfo(
        req.body
      );
      return res.status(200).json({
        resultMessage: 'success',
        resultCode: 200,
        resultData: resultData,
      });
    },
  },

  /**
   * @title /company
   * @method DELETE
   * @description 회사 정보 삭제
   * @param { company_id } body
   */
  {
    path: '/company',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      const { company_id } = req.body;
      const resultData = await CompanyServiceInstance.deleteCompanyInfo(
        company_id
      );
      return res.status(200).json({
        resultMessage: 'success',
        resultCode: 200,
        resultData: resultData,
      });
    },
  },
  /**
   * @title /company/member
   * @method PUT
   * @description 회사 멤버 등록
   * @param { company_id, member_id } body
   */
  {
    path: '/company/member',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      // console.log(req.body);
      const resultData = await CompanyServiceInstance.registMember(req.body);
      return res.status(200).json({
        resultMessage: 'success',
        resultCode: 200,
        resultData: resultData,
      });
    },
  },

  /**
   * @title /company/member
   * @method DELETE
   * @description 회사 멤버 삭제
   * @param { company_id, member_id } body
   */
  {
    path: '/company/member',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      const resultData = await CompanyServiceInstance.unregistMember(req.body);
      return res.status(200).json({
        resultMessage: 'success',
        resultCode: 200,
        resultData: resultData,
      });
    },
  },
];
