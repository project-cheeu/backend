import moment from 'moment';
import models from '../../models';
import { logger } from '../../utils/winstonLogger';

export default class ManagerService {
  async insertManager(managerInfo) {
    try {
      const result = await models.manager.create(managerInfo);
      const { manager_id } = result;
      return manager_id;
    } catch (e) {
      logger.error(`[ManagerService][insertManager] Error: ${e.message}`);
      throw e.message;
    }
  }
  async checkManager() {
    try {
      const result = await models.manager.findAll();
      return result.length;
    } catch (e) {
      logger.error(`[ManagerService][getManagerList] Error: ${e.message}`);
      throw e.message;
    }
  }
  async getManagerList() {
    try {
      const result = await models.manager.findAll();
      return result;
    } catch (e) {
      logger.error(`[ManagerService][getManagerList] Error: ${e.message}`);
      throw e.message;
    }
  }
  async updateManager(managerInfo) {
    try {
      const {
        manager_id,
        manager_login_id,
        manager_login_pw,
        manager_nm,
        manager_pin,
      } = managerInfo;
      // console.log(managerInfo);
      const result = await models.manager.update(
        {
          manager_login_pw,
          manager_nm,
          manager_pin,
          modified_at: new moment().unix(),
        },
        {
          where: {
            manager_id,
            manager_login_id,
          },
        }
      );
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[ManagerService][updateManager] Error: ${e.message}`);
      throw e.message;
    }
  }
  async deleteManager(managerInfo) {
    try {
      const { manager_id } = managerInfo;
      const result = await models.manager.destroy({ where: { manager_id } });
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[ManagerService][deleteManager] Error: ${e.message}`);
      throw e;
    }
  }
}
