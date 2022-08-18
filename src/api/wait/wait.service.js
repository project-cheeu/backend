import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import WaitQuery from './query';
export default class WaitService {
  /**
   * 대기화면 병원 정보 점검
   * --
   * @param {Object} companyInfo
   * @returns
   */
  async checkCompany(companyInfo) {
    try {
      const { company_id } = companyInfo;
      const query = WaitQuery.checkCompany();
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      if (result) {
        return result;
      }
      throw '비정상적인 접근입니다.';
    } catch (e) {
      console.log(e);
      logger.error(`[WaitService][checkCompany] Error ${e.message}`);
      throw e.message;
    }
  }

  async getWaitList(companyInfo) {
    try {
      const { company_id } = companyInfo;
      const query = WaitQuery.getWaitList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[WaitService][getWaitList] Error ${e.message}`);
      throw e.message;
    }
  }
}
