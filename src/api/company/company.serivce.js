import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import moment from 'moment';
import CompanyQuery from './query';
/**
 * @title CompanyService
 * @description 회사 관리
 */
export default class CompanyService {
  /**
   * @title insertCompany
   * @description 회사 정보 입력
   * @param insertCompanyData(company_id,company_nm,company_tel,company_addr,company_mail,company_num,company_regist_num,created_at,modify_at,use_yn)
   * @return Success => company_id:String
   * @return Failure => e:Object
   */
  async insertCompanyInfo(insertCompanyData) {
    try {
      const result = await models.company.create(insertCompanyData);
      return result;
    } catch (e) {
      logger.error(`[CompanyService][insertCompanyInfo] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title signupCompany
   * @description 회사 최초 등록
   * @param signupInfo{comapny_info, dept_info, member_info}
   * @return Success =>
   * @return Failure =>
   */
  async signupCompany(signupInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { companyInfo, deptInfo, memberInfo } = signupInfo;
      const company = await models.company.create(companyInfo, { transaction });
      if (!company) {
        throw 'company is not allow';
      }

      const { company_id } = company;

      const member = await models.member.create(memberInfo, { transaction });
      if (!member) {
        throw 'member is not allow';
      }

      const { member_id, member_nm } = member;

      const member_company = models.member_company.create(
        {
          member_id: member_id,
          company_id: company_id,
        },
        { transaction }
      );

      if (!member_company) {
        throw 'member_company is not allow';
      }

      const dept = await models.dept.create(
        {
          ...deptInfo,
          company_id: company_id,
          dept_manager: member_nm,
        },
        { transaction }
      );
      if (!dept) {
        throw 'dept is not allow';
      }

      const { dept_id } = dept;

      const member_dept = models.member_dept.create(
        { member_id, dept_id },
        { transaction }
      );

      if (!member_dept) {
        throw 'member_dept is not allow';
      }

      await models.survey.create(
        {
          survey_date: new moment().unix(),
          survey_type: 'PRE_SURVEY',
          company_id: company_id,
        },
        { transaction }
      );
      await models.survey.create(
        {
          survey_date: new moment().unix(),
          survey_type: 'SURVEY',
          company_id: company_id,
        },
        { transaction }
      );
      await transaction.commit();
      return true;
    } catch (e) {
      await transaction.rollback();
      logger.error(
        `[CompanyService][signupCompany] Error: ${JSON.stringify(e)}`
      );
      throw e;
    }
  }

  /**
   * @title getCompany
   * @description 회사 리스트 불러오기
   * @param
   * @return Success => company[]( company_id, company_nm, company_tel, company_addr, company_mail, company_num, company_regist_num, created_at, modify_at, use_yn )
   * @return Failure => e:Object
   */
  async getCompanyList() {
    try {
      // const result = await models.company.findAll();
      const query = CompanyQuery.getCompanyList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return result;
    } catch (e) {
      logger.error(`[CompanyService][getCompanyList] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title getCompany
   * @description 회사 상세 정보 가져오기
   * @param company_id
   * @return Success => company( company_id, company_nm, company_tel, company_addr, company_mail, company_num, company_regist_num, created_at, modify_at, use_yn )
   * @return Failure => e:Object
   */
  async getCompanyDetail(company_id) {
    try {
      const companyQuery = CompanyQuery.getCompanyInfo();
      const [company] = await models.sequelize.query(companyQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });

      const deptQuery = CompanyQuery.getDeptInfo();
      const dept = await models.sequelize.query(deptQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });

      const memberQuery = CompanyQuery.getCompanyMemberInfo();
      const member_company = await models.sequelize.query(memberQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });

      const assetsQuery = CompanyQuery.getCompanyAssetsInfo();
      const [assets] = await models.sequelize.query(assetsQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });

      const result = {
        ...company,
        depts: dept,
        member_company,
        assets,
      };

      return result;
    } catch (e) {
      logger.error(`[CompanyService][getCompanyDetail] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title updateCompanyInfo
   * @description 회사 정보 수정
   * @param company( company_id, company_nm, company_tel, company_addr, company_mail )
   * @return Success => 1
   * @return Failure => 0
   */
  async updateCompanyInfo(updateCompanyData) {
    try {
      const {
        company_id,
        company_nm,
        company_tel,
        company_addr,
        company_mail,
        ebook_url,
      } = updateCompanyData;

      const result = await models.company.update(
        {
          company_nm,
          company_tel,
          company_addr,
          company_mail,
          ebook_url,
          modify_at: new moment().unix(),
        },
        {
          where: {
            company_id,
          },
        }
      );

      return result;
    } catch (e) {
      logger.error(`[CompanyService][updateCompanyInfo] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title deleteCompanyInfo
   * @description 회사 정보 삭제(이용 불가 상태로 만듬.)
   * @param company_id
   * @return Success => 1
   * @return Failure => 0
   */
  async deleteCompanyInfo(company_id) {
    try {
      const result = await models.company.update(
        {
          use_yn: 'DISABLE',
        },
        {
          where: {
            company_id,
          },
        }
      );

      return result;
    } catch (e) {
      logger.error(`[CompanyService][deleteCompanyInfo] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title registMember
   * @description 회사 멤버 매핑
   * @param { company_id, member_id } memberInfo
   * @return Success => 1
   * @return Failure => 0
   */
  async registMember(memberInfo) {
    try {
      const result = await models.member_company.create(memberInfo);
      return result;
    } catch (e) {
      logger.error(`[CompanyService][registMember] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title registMember
   * @description 회사 멤버 매핑
   * @param {} memberInfo
   * @return Success => 1
   * @return Failure => 0
   */
  async unregistMember(memberInfo) {
    try {
      const { company_id, member_id } = memberInfo;
      const result = await models.member_company.destroy({
        where: { company_id, member_id },
      });

      return result;
    } catch (e) {
      logger.error(`[CompanyService][unregistMember] Error: ${e.message}`);
      throw e;
    }
  }
}
