import AlimtalkService from './alimtalk.service';
import { Container } from 'typedi';
let AlimtalkServiceInstance = Container.get(AlimtalkService);
export default [
  /**
   * @title /alimtalk
   * @method GET
   * @description 알림톡 목록 조회
   */
  {
    path: '/alimtalk',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AlimtalkServiceInstance.getAlimtalkList();
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
   * @title /alimtalk/:company_id
   * @method GET
   * @description 병원별 알림톡 목록 조회
   */
  {
    path: '/alimtalk/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await AlimtalkServiceInstance.getAlimtalk(
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
];
