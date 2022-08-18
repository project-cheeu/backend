import moment from 'moment';
import schedule from 'node-schedule';
import models from '../models';
import { logger } from './winstonLogger';

export default {
  test: () => {
    try {
      schedule.scheduleJob('*/10 * * * * *', (e) => {
        console.log('hi!');
        console.log(e);
      });
    } catch (error) {
      console.log(error);
    }
  },
  cancel: () => {
    schedule.cancelJob();
  },
  purchase: () => {
    schedule.scheduleJob('* 23 * * * *', async () => {
      try {
        const query = `
        UPDATE
          medical_table
        SET
          medical_status = "RECEIVE",
          completed_at = UNIX_TIMESTAMP()
        WHERE
          medical_status != "RECEIVE";`;
        const result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.UPDATE,
        });
        logger.info(`[AutoPurchase] [Purchase] ${result}`);
      } catch (e) {
        logger.error(`[AuthPurchase][Purchase] ${JSON.stringify(e)}`);
      }
    });
  },
};
