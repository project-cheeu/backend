import models from '../../models';
import moment from 'moment';

import { logger } from '../../utils/winstonLogger';
import MedicalTableQuery from './query';
export default class MedicalTablbeService {
  async insertMedicalTable(medicalInfo) {
    try {
      const { customer_id } = medicalInfo;
      const checkQuery = MedicalTableQuery.checkMedical();
      // const [{ count }] = await models.sequelize.query(checkQuery, {
      //   type: models.sequelize.QueryTypes.SELECT,
      //   raw: true,
      //   replacements: { customer_id },
      // });
      let count = false;

      if (!count) {
        const result = await models.medical_table.create({
          ...medicalInfo,
        });
        const { medical_id } = result;

        return {
          code: 200,
          data: medical_id,
          message: 'success',
        };
      }
      return {
        code: 400,
        data: [],
        message: '이미 등록되어 있습니다.',
      };
    } catch (e) {
      console.log(e);
      logger.error(
        `[MedicalTablbeService][insertMedicalTable] Error: ${e.message}`
      );
      throw e;
    }
  }

  async getMedicalListAll() {
    try {
      const query = MedicalTableQuery.getMedicalListAll();

      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][getMedicalTable] Error: ${e.message}`
      );
      throw e;
    }
  }

  async getMedicalDetail(medical_id) {
    try {
      const query = MedicalTableQuery.getMedicalDetail();
      const medicals = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { medical_id },
      });

      const [medical] = medicals;

      const { customer_id } = medical;

      const medicalList = await models.medical_table.findAll({
        where: { customer_id },
      });

      return {
        medical,
        medicalList,
      };
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][getMedicalDetail] Error: ${e.message}`
      );
      throw e;
    }
  }

  async checkCustomerMedical(customer_id) {
    try {
      const query = MedicalTableQuery.checkCustomerMedical();

      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][getMedicalTable] Error: ${e.message}`
      );
      throw e;
    }
  }

  async getMedicalTable(params) {
    try {
      const { company_id, type } = params;

      let query;
      if (type === '1') {
        query = MedicalTableQuery.getMedicalStatus();
      } else {
        query = MedicalTableQuery.getMedicalList();
      }

      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][getMedicalTable] Error: ${e.message}`
      );
      throw e;
    }
  }

  async updateMedicalTable(medicalInfo) {
    try {
      const { medical_id, medical_status, completed_at, medical_subject } =
        medicalInfo;
      var complete;
      switch (medical_status) {
        case 'TREATMENT':
        case 'CONSULTING':
        case 'RESERVATION_CANCEL':
        case 'DONE':
        case 'RECEIVE':
          complete = new moment().unix();
          break;
        default:
          complete = null;
      }
      const result = await models.medical_table.update(
        {
          medical_status,
          completed_at: complete,
          medical_subject,
        },
        { where: { medical_id } }
      );
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][updateMedicalTable] Error: ${e.message}`
      );
      throw e;
    }
  }

  async insertSubjectCode(subjectInfo) {
    try {
      const result = await models.subject_code.create(subjectInfo);
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][insertSubjectCode] Error: ${e.message}`
      );
      throw e;
    }
  }

  async getMedicalSubject() {
    try {
      const result = await models.subject_code.findAll();
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][checkMedicalSubject] Error: ${e.message}`
      );
      throw e;
    }
  }

  async updateMedicalSubject(medicalInfo) {
    try {
      const { subject_code_id, subject_nm, subject_desc } = medicalInfo;
      const result = await models.subject_code.update(
        {
          subject_nm,
          subject_desc,
        },
        {
          where: { subject_code_id },
        }
      );
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][updateMedicalSubject] Error: ${e.message}`
      );
      throw e;
    }
  }

  async deleteMedicalSubject(medicalInfo) {
    try {
      const { subject_code_id } = medicalInfo;
      const result = await models.subject_code.destroy({
        where: { subject_code_id },
      });
      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][deleteMedicalSubject] Error: ${e.message}`
      );
      throw e;
    }
  }

  async searchMedicalSubject(keyword) {
    try {
      const query = MedicalTableQuery.checkSubjectCode();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { keyword: `%${keyword}%` },
      });

      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][checkMedicalSubject] Error: ${e.message}`
      );
      throw e;
    }
  }

  async getAlimtalkData(medical_id) {
    try {
      const query = MedicalTableQuery.getAlimtalkData();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { medical_id },
      });

      return result;
    } catch (e) {
      logger.error(
        `[MedicalTablbeService][getAlimtalkData] Error: ${e.message}`
      );
      throw e;
    }
  }
}
