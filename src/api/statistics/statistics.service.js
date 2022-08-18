import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import StatisticsQuery from './query';

export default class StatisticsService {
  async getCustomerCountByDate(medical_date) {
    try {
      const { type, start_date, end_date, gender, order } = medical_date;
      console.log(medical_date);
      let result;
      if (type === 'y') {
        const query = StatisticsQuery.getCustomerCountByYear(gender);
        result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          raw: true,
          replacements: { medical_date: start_date },
        });
      } else if (type === 'm') {
        const query = StatisticsQuery.getCustomerCountByMonth(gender);
        result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          raw: true,
          replacements: { medical_date: start_date },
        });
      } else {
        const query = StatisticsQuery.getCustomerCountByDuration(gender);
        result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          raw: true,
          replacements: { start_date, end_date },
        });
      }

      return result;
    } catch (e) {
      logger.error(
        `[StatisticsService][getCustomerCountByYear] Error: ${e.message}`
      );
      throw e;
    }
  }
}
