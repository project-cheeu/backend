import models from '../../models';
import moment from 'moment';
import { logger } from '../../utils/winstonLogger';
import CustomerQuery from './query';
import _ from 'lodash';

export default class CustomerService {
  /**
   * @title insertCustomer
   * @description 회원 등록
   * @param { customer_nm, customer_tel, customer_addr, customer_num, agree_date, access_platform, member_id } insertCustomerData
   * @return Success => customer_id:string
   * @return Failure => 0
   */
  async insertCustomer(insertCustomerData) {
    const transaction = await models.sequelize.transaction();
    try {
      const { customer_tel } = insertCustomerData;
      const tel = await models.chief_customer.findAll(
        {
          where: { customer_tel },
        },
        { transaction }
      );

      if (tel.length === 0) {
        const { customer_nm } = insertCustomerData;
        await models.chief_customer.create(
          {
            customer_tel: customer_tel,
            chief_nm: customer_nm,
          },
          { transaction }
        );
      }

      const customer = await models.customer.create(
        { ...insertCustomerData },
        {
          transaction,
        }
      );

      const { company_id } = insertCustomerData;
      let medical;
      if (company_id) {
        const { customer_id } = customer;
        medical = await models.medical_table.create(
          { customer_id, company_id },
          { transaction }
        );
      }

      await transaction.commit();

      return medical.medical_id;
    } catch (e) {
      await transaction.rollback();
      logger.error(`[CustomerService][insertCustomerInfo] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title insertCustomerDetail
   * @description 회원 상세정보 등록
   * @param { customer_id, visiting_path, medical_history, customer_insurance } customer_detail
   * @return Success => true:bool
   * @return Failure => false:bool
   */
  async insertCustomerDetail(customer_detail) {
    try {
      // console.log(customer_detail);
      const result = await models.customer_detail.create(customer_detail);
      if (result) {
        return true;
      }
      return false;
    } catch (e) {
      logger.error(
        `[CustomerService][insertCustomerDetail] Error: ${e.message}`
      );
      throw e;
    }
  }

  /**
   * 사용자 상세 정보 수정
   * --
   * @param {object} detailInfo
   * @returns
   */
  async updateCustomerDetail(detailInfo) {
    try {
      const { customer_id, ...details } = detailInfo;
      const result = await models.customer_detail.update(
        { ...details, modified_at: new moment().unix() },
        {
          where: { customer_id },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CustomerService][updateCustomerDetail] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * @title getCustomer
   * @description 회원 조회
   * @param { customer_id, company_id } customerInfo
   * @return Success => customer[](customer_id,  customer_nm,  customer_num,  customer_addr,  customer_tel,  agree_date,  created_at,  modified_at,  access_platform,  member_qr,  member_id)
   * @return Failure => 0
   */
  async getCustomer(company_id) {
    try {
      const query = CustomerQuery.getCusotmer();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[CustomerService][getCustomer] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title getCustomerDetail
   * @description 회원 상세 조회
   * @param { customer_id, company_id } customerInfo
   * @return Success => customer[](customer_id,  customer_nm,  customer_num,  customer_addr,  customer_tel,  agree_date,  created_at,  modified_at,  access_platform,  member_qr,  member_id)
   * @return Failure => 0
   */
  async getCustomerDetail(params) {
    try {
      const query = CustomerQuery.getCustomerDetail();
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        // raw: true,
        replacements: params,
      });
      const emergencyQuery = CustomerQuery.getCustomerEmergency();
      const [customer_emergency] = await models.sequelize.query(
        emergencyQuery,
        {
          type: models.sequelize.QueryTypes.SELECT,
          replacements: params,
        }
      );
      return { ...result, customer_emergency };
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][getCustomerDetail] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * 고객 의료정보 조회
   * --
   * @param {Object} params
   */
  async getCustomerMedical(params) {
    try {
      const { customer_id } = params;
      const query = CustomerQuery.getCustomerMedical();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][getCustomerDetail] Error ${e.message}`);
      throw e.message;
    }
  }
  /**
   * @title getCustomerAll
   * @description 회원 전체 조회
   * @param {}
   * @return Success => customer[](customer_id,  customer_nm,  customer_num,  customer_addr,  customer_tel,  agree_date,  created_at,  modified_at,  access_platform,  member_qr,  member_id)
   * @return Failure => 0
   */
  async getCustomerAll() {
    try {
      const result = await models.customer.findAll();

      return result;
    } catch (e) {
      logger.error(`[CustomerService][getCustomerAll] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title searchCustomer
   * @description 회원 가입 여부 조회
   * @param {customer_tel}
   * @return Success => customer[](customer_id,  customer_nm,  customer_num,  customer_addr,  customer_tel,  agree_date,  created_at,  modified_at,  access_platform,  member_qr,  member_id)
   * @return Failure => 0
   */
  async searchCustomer(customer_tel) {
    const transaction = await models.sequelize.transaction();

    try {
      const query = CustomerQuery.searchCustomer();
      const [chief] = await models.sequelize.query(
        query,
        {
          type: models.sequelize.QueryTypes.SELECT,
          replacements: { customer_tel },
        },
        { transaction }
      );
      const userList = await models.customer.findAll(
        {
          where: { customer_tel },
          order: [['created_at', 'ASC']],
        },
        { transaction }
      );

      const result = {
        chief,
        userList,
      };

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      logger.error(`[CustomerService][getCustomerAll] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title getCustomerRecently
   * @description 회원 최근 방문 병원
   * @param {String} customer_id
   */
  async getCustomerRecently(customerInfo) {
    try {
      const { customer_id } = customerInfo;
      const query = CustomerQuery.getCustomerRecently();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      const a = _.uniqBy(result, 'company_id');
      let res;
      if (a.length >= 5) {
        res = a.slice(0, 5);
      } else {
        res = a;
      }

      return res;
    } catch (e) {
      logger.error(
        `[CustomerService][getCustomerRecently] Error: ${e.message}`
      );
      throw e;
    }
  }

  /**
   * @title checkPresurvey
   * @description 문진 조사 여부 조회
   * @param {customer_tel}
   * @return Success => customer[](customer_id,  customer_nm,  customer_num,  customer_addr,  customer_tel,  agree_date,  created_at,  modified_at,  access_platform,  member_qr,  member_id)
   * @return Failure => 0
   */
  async checkPresurvey(customer_tel) {
    try {
      const query = CustomerQuery.checkPreSurvey();
      // result = await models.customer.findOne({ where: customerInfo });
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        // raw: true,
        replacements: { customer_tel },
      });
      return result[0];
    } catch (e) {
      logger.error(`[CustomerService][checkPresurvey] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title updateCustomer
   * @description 회원 수정
   * @param { customer_id, customer_nm, customer_tel, customer_addr, member_id } customerInfo
   * @return Success => 1
   * @return Failure => 0
   */
  async updateCustomer(customerInfo) {
    try {
      const { customer_id, customer_nm, customer_tel, customer_addr } =
        customerInfo;
      const result = await models.customer.update(
        {
          customer_nm,
          customer_tel,
          customer_addr,
          modified_at: moment(),
        },
        {
          where: {
            customer_id,
          },
        }
      );
      return result;
    } catch (e) {
      logger.error(`[CustomerService][updateCustomer] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title deleteCustomer
   * @description 회원 삭제
   * @param { customer_id,customer_num } customerInfo
   * @return Success => 1
   * @return Failure => 0
   */
  async deleteCustomer(customerInfo) {
    try {
      const { customer_id, customer_num } = customerInfo;
      const result = await models.customer.update(
        { use_yn: false, modified_at: moment() },
        {
          where: {
            customer_id,
            customer_num,
          },
        }
      );
      return result;
    } catch (e) {
      logger.error(`[CustomerService][deleteCustomer] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title insertSingleCustomer
   * @description 회원 단일 등록
   * @return Success => 1
   * @return Failure => 0
   */
  async insertSingleCustomer(customerInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { customer_tel, customer_nm } = customerInfo;
      const tel = await models.chief_customer.findAll(
        {
          where: { customer_tel },
        },
        { transaction }
      );
      if (tel.length === 0) {
        await models.chief_customer.create(
          {
            customer_tel: customer_tel,
            chief_nm: customer_nm,
          },
          { transaction }
        );
      }
      const result = await models.customer.create(customerInfo, {
        transaction,
      });
      await transaction.commit();
      return result;
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      logger.error(`[CustomerService][insertBulkCustomer] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title insertBulkCustomer
   * @description 회원 다수 등록
   * @return Success => 1
   * @return Failure => 0
   */
  async insertBulkCustomer(bulk) {
    const transaction = await models.sequelize.transaction();
    try {
      const {
        // chiefList,
        customerList,
      } = bulk;
      // const chiefTemp = chiefList.map((item) => {
      //   return { ...item, chief_nm: item.customer_nm };
      // });

      // await models.chief_customer.bulkCreate(chiefTemp, {
      //   transaction: transaction,
      //   ignoreDuplicates: true,
      // });

      await models.customer_dump.bulkCreate(customerList, {
        transaction: transaction,
        ignoreDuplicates: true,
      });

      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[CustomerService][insertBulkCustomer] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * 회원 의료정보 등록
   * --
   * @param {Object} customerEmergency
   * @returns
   */
  async insertCustomerEmergency(customerEmergency) {
    try {
      const result = await models.customer_emergency.create(customerEmergency);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CustomerService][insertCustomerEmergency] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 회원 의료정보 수정
   * --
   * @param {Object} customerEmergency
   * @returns
   */
  async putCustomerEmergency(customerEmergency) {
    try {
      const { customer_id, ...emergencies } = customerEmergency;
      console.log(emergencies);
      const result = await models.customer_emergency.update(emergencies, {
        where: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CustomerService][putCustomerEmergency] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 병원별 고객 덤프 데이터 조회
   * --
   * @param {Object} companyInfo
   * @returns
   */
  async getCustomerDumpList(companyInfo) {
    try {
      const query = CustomerQuery.getCustomerDumpList();
      const { company_id } = companyInfo;
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][getCustomerDumpList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 고객 덤프 데이터 검색
   * --
   * @param {Object} dumpInfo
   * @returns
   */
  async searchCustomerDump(dumpInfo) {
    try {
      const { customer_tel, company_id } = dumpInfo;
      const query = CustomerQuery.searchCustomerDump();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id, customer_tel },
      });
      console.log(result);
      return result;
    } catch (e) {
      logger.error(`[CustomerService][searchCustomerDump] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 덤프 고객 가입
   * --
   * @param {Objet} customerInfo
   * @returns
   */
  async registDumpCustomer(customerInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { dependents } = customerInfo;
      await models.chief_customer.create(customerInfo, { transaction });
      await models.customer.create(userInfo, { transaction });

      if (dependents) {
        await models.customer.bulkCreate(dependents, { transaction });
      }
      const { customer_tel } = customerInfo;
      await models.customer_dump.destroy({ where: { customer_tel } });
      await transaction.commit();
      return true;
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      logger.error(`[CustomerService][registDumpCustomer] Error ${e.message}`);
      throw e.message;
    }
  }
}
