import models from '../../models';
import moment from 'moment';
import { logger } from '../../utils/winstonLogger';
import MemberQuery from './query';
export default class MemberService {
  /**
   * @title insertMember
   * @description 사원 정보 입력
   * @param { member_login_id, member_login_pw, member_nm, member_div } memberInfo
   * @return Success => member_id:String
   * @return Failure => e:Object
   */
  async insertMember(memberInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { dept_id, company_id } = memberInfo;
      let member_id;
      const result = await models.member.create(memberInfo, { transaction });
      member_id = result.member_id;
      if (company_id && dept_id) {
        await models.member_company.create(
          { ...memberInfo, member_id },
          { transaction }
        );
        await models.member_dept.create(
          { ...memberInfo, member_id },
          { transaction }
        );
      }

      await transaction.commit();
      return member_id;
    } catch (e) {
      transaction.rollback();
      logger.error(`[MemberService][insertMember] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title getMemberList
   * @description 사원 목록 조회
   * @param {}
   * @return Success => member[](member_id, member_login_id, member_login_pw, member_nm, member_div, created_at, modify_at, use_yn)
   * @return Failure => e:Object
   */
  async getMemberList() {
    try {
      const result = await models.member.findAll();
      return result;
    } catch (e) {
      logger.error(`[MemberService][getMemberList] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title getMember
   * @description 회사별 사원 목록 조회
   * @param {}
   * @return Success => member[](member_id, member_login_id, member_login_pw, member_nm, member_div, created_at, modify_at, use_yn)
   * @return Failure => e:Object
   */
  async getMember(company_id) {
    try {
      const query = MemberQuery.getMember();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      logger.error(`[MemberService][getMemberList] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title getMemberDetail
   * @description 사원 상세 조회
   * @param { company_id, member_id } memberInfo
   * @return Success => member[](member_id, member_login_id, member_login_pw, member_nm, member_div, created_at, modify_at)
   * @return Failure => e:Object
   */
  async getMemberDetail(memberInfo) {
    try {
      const { member_id } = memberInfo;
      let result;

      // const result = await models.member_company.findOne({
      //   where: memberInfo,
      //   include: [{ model: models.company }, { model: models.member }],
      // });
      if (member_id) {
        result = await models.member.findOne({
          where: { member_id },
          include: [
            {
              model: models.member_company,
              attributes: ['company_id'],
              include: [{ model: models.company }],
            },
            {
              model: models.member_dept,
              attributes: ['dept_id'],
              include: [{ model: models.dept }],
            },
          ],
        });
      } else {
        result = await models.member_company.findAll({
          where: memberInfo,
          include: [
            {
              model: models.member,
              include: [
                {
                  model: models.member_dept,
                  attributes: ['dept_id'],
                  include: [{ model: models.dept }],
                },
              ],
            },
          ],
        });
      }

      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[MemberService][getMemberDetail] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title updateMember
   * @description 사원 정보 수정
   * @param {member_id, member_login_id, member_login_pw, member_nm, member_div} memberInfo
   * @return Success => 1
   * @return Failure => 0
   */
  async updateMember(memberInfo) {
    try {
      const { member_id, member_login_pw, member_nm, member_pin, member_div } =
        memberInfo;
      // console.log(memberInfo);
      const result = await models.member.update(
        {
          member_login_pw,
          member_nm,
          member_pin,
          member_div,
        },
        { where: { member_id } }
      );
      return result;
    } catch (e) {
      logger.error(`[MemberService][updateMember] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title deleteMember
   * @description 사원 정보 삭제
   * @param {member_id, member_login_id, member_login_pw } memberInfo
   * @return Success => 1
   * @return Failure => 0
   */
  async deleteMember(memberInfo) {
    try {
      const { member_id, member_login_id, member_login_pw } = memberInfo;
      const result = await models.member.destroy({
        where: { member_id, member_login_id, member_login_pw },
      });
      return result;
    } catch (e) {
      logger.error(`[MemberService][deleteMember] Error: ${e.message}`);
      throw e;
    }
  }
}
