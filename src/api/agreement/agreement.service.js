import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import AgreementQuery from './query';
export default class AgreementService {
  /**
   * @title insertAgreementForm
   * @description 동의서 정보 입력
   * @return Success =>
   * @return Failure =>
   */
  async insertAgreement(formInfo) {
    try {
      // console.log(formInfo);
      const result = await models.user_agreement.create(formInfo);
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[AgreementService][insertAgreement] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title getAgreement
   * @description 동의서 정보 입력
   * @return Success =>
   * @return Failure =>
   */
  async getAgreement(agreementInfo) {
    try {
      // console.log(agreementInfo);
      const query = AgreementQuery.getAgreement();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: agreementInfo,
      });
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[AgreementService][getAgreement] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title insertAgreementForm
   * @description 동의서 정보 입력
   * @return Success =>
   * @return Failure =>
   */
  async insertAgreementForm(formInfo) {
    try {
      const result = await models.agreement_form.create(formInfo);
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[AgreementService][insertAgreement] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title getAlimtalkByCompanyId
   * @description 동의서 정보 가져오기
   * @return Success =>
   * @return Failure =>
   */
  async getAgreementFormList(company_id) {
    try {
      const query = AgreementQuery.getAgreementFormList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[AgreementService][getAgreementList] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title updateAgreementForm
   * @description 동의서 정보 입력
   * @return Success =>
   * @return Failure =>
   */
  async updateAgreementForm(formInfo) {
    try {
      const { form_id, usage, form_nm } = formInfo;
      const result = await models.agreement_form.update(
        { usage, form_nm },
        { where: { form_id } }
      );
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(
        `[AgreementService][updateAgreementForm] Error: ${e.message}`
      );
      throw e;
    }
  }
  /**
   * @title deleteAgreementForm
   * @description 동의서 정보 입력
   * @return Success =>
   * @return Failure =>
   */
  async deleteAgreementForm(formInfo) {
    try {
      const { form_id } = formInfo;
      const result = await models.agreement_form.destroy({
        where: { form_id },
      });
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(
        `[AgreementService][deleteAgreementForm] Error: ${e.message}`
      );
      throw e;
    }
  }
}
