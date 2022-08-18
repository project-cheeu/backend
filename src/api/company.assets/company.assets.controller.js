import CompanyAssetsService from './company.assets.serivce';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
let CompanyAssetsServiceInstance = Container.get(CompanyAssetsService);
export default [
  /**
   * @title /assets
   * @method POST
   * @description 회사 자원정보 등록
   * @param {logo_url, voice_text,	title_text,	welcome_text,	visit_text,	revisit_text,	company_id} body
   */
  {
    path: '/assets',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyAssetsServiceInstance.insertCompanyAssets(
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
   * @title /assets
   * @method GET
   * @description 회사 자원 정보 전체 조회
   * @param {-}
   */
  {
    path: '/assets',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyAssetsServiceInstance.getCompanyAssetsList();
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
   * @title /assets/:company_id
   * @method GET
   * @description 회사 정보 단일 조회
   * @param {company_id} param
   */
  {
    path: '/assets/:company_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        // console.log(company_id);
        const resultData = await CompanyAssetsServiceInstance.getCompanyAssets(
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
   * @title /assets
   * @method PUT
   * @description 회사 자원 정보 수정
   * @param {assets_id, logo_url,	voice_text,	title_text,	welcome_text,	visit_text,	revisit_text,	company_id} body
   */
  {
    path: '/assets',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      const resultData = await CompanyAssetsServiceInstance.updateCompanyAssets(
        req.body
      );
      return res.status(200).json({
        resultMessage: 'success',
        resultCode: 200,
        resultData: resultData,
      });
    },
  },
];
