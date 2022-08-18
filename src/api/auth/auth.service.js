import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ManagerQuery from './query';
export default class AuthService {
  async login(loginInfo) {
    try {
      const { member_login_id, member_login_pw } = loginInfo;

      const member = await models.member.findOne({
        where: { member_login_id, member_login_pw, use_yn: true },
        attributes: [
          'member_id',
          'member_login_id',
          'member_nm',
          'member_div',
          'member_pin',
          'created_at',
          'modify_at',
          'use_yn',
        ],
      });
      if (!member) {
        return {
          code: 401,
          message: 'Access Not Allow',
          data: [],
        };
      }
      const company = await models.member_company.findOne({
        where: { member_id: member.member_id },
        attributes: ['company_id'],
        include: [{ model: models.company }],
      });

      const assets = await models.company_assets.findOne({
        where: { company_id: company.company_id },
      });
      const result = {
        member,
        company,
        assets,
      };

      const JM = await new JWTManager();
      const token = await JM.createSign({ ...member.member_id }, '12h');

      return { code: 200, data: { ...result, token }, message: 'Success' };
    } catch (e) {
      logger.error(`[AuthService][login] Error: ${e.message}`);
      throw e;
    }
  }
  async managerLogin(loginInfo) {
    try {
      const { manager_login_id, manager_login_pw } = loginInfo;
      const query = ManagerQuery.managerLogin();
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { manager_login_id, manager_login_pw },
      });
      if (!result) {
        return {
          code: 401,
          message: 'Access Not Allow',
          data: [],
        };
      }
      const JM = await new JWTManager();
      const token = await JM.createSign({ ...result }, '3h');

      return {
        code: 200,
        data: { ...result.dataValues, token },
        message: 'Success',
      };
    } catch (e) {
      logger.error(`[ManagerService][loginInfo] Error: ${e.message}`);
      throw e;
    }
  }
}
