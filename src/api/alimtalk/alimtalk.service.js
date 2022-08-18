import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import AlimtalkQuery from './query';
export default class AlimtalkService {
  /**
   * @title getAlimtalkByCompanyId
   * @description 알림톡 정보 가져오기
   * @return Success =>
   * @return Failure =>
   */
  async getAlimtalkList() {
    try {
      const query = AlimtalkQuery.getAlimtalkList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return result;
    } catch (e) {
      logger.error(`[AlimtalkService][getAlimtalkList] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title getAlimtalkByCompanyId
   * @description 회사ID별 알림톡 정보 가져오기
   * @return Success =>
   * @return Failure =>
   */
  async getAlimtalk(company_id) {
    try {
      const query = AlimtalkQuery.getAlimtalk();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      logger.error(`[AlimtalkService][getAlimtalk] Error: ${e.message}`);
      throw e;
    }
  }
}
