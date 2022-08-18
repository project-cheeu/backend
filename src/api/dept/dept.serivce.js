import models from '../../models';
import moment from 'moment';
import { logger } from '../../utils/winstonLogger';
export default class DeptService {
  /**
   * @title insertDept
   * @description 부서 정보 입력
   * @param deptInfo(dept_nm, company_id, dept_manager)
   * @return Success => company_id:String
   * @return Failure => e:Object
   */
  async insertDept(deptInfo) {
    try {
      const result = await models.dept.create(deptInfo);
      const { dept_id } = result;
      return dept_id;
    } catch (e) {
      logger.error(`[DeptService][insertDept] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title getDept
   * @description 회사 부서 리스트 불러오기
   * @param
   * @return Success => dept[]( dept_id,  dept_nm,  created_at,  modify_at,  dept_yn,  company_id,  dept_manager )
   * @return Failure => e:Object
   */
  async getDeptList(company_id) {
    try {
      const result = await models.dept.findAll({
        where: {
          company_id: company_id,
        },
      });
      return result;
    } catch (e) {
      logger.error(`[DeptService][getDeptList] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title update_dept
   * @description 부서 정보 수정
   * @param deptInfo(dept_nm, company_id, dept_manager, modify_at)
   * @return Success => 1
   * @return Failure => 0
   */
  async updateDept(deptInfo) {
    try {
      const { dept_id, dept_nm, company_id, dept_manager } = deptInfo;
      // console.log(deptInfo);
      const result = await models.dept.update(
        { dept_nm, dept_manager },
        { where: { company_id, dept_id } }
      );
      return result;
    } catch (e) {
      logger.error(`[DeptService][updateDept] Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * @title deleteDept
   * @description 부서 정보 삭제(이용 불가 상태로 만듬.)
   * @param {company_id, dept_id} body
   * @return Success => 1
   * @return Failure => 0
   */
  async deleteDept(deptInfo) {
    try {
      // console.log(deptInfo);
      const { company_id, dept_id } = deptInfo;
      const result = await models.dept.update(
        {
          dept_yn: false,
          modify_at: moment(),
        },
        {
          where: {
            company_id,
            dept_id,
          },
        }
      );

      return result;
    } catch (e) {
      logger.error(`[DeptService][deleteDept] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title registDeptMember
   * @description 부서 사원 등록
   * @param {company_id, dept_id} body
   * @return Success => 1
   * @return Failure => 0
   */
  async registDeptMember(registInfo) {
    try {
      const result = await models.member_dept.create(registInfo);

      return result;
    } catch (e) {
      logger.error(`[DeptService][registDeptMember] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title updateDeptMember
   * @description 부서 사원 수정
   * @param {company_id, dept_id} body
   * @return Success => 1
   * @return Failure => 0
   */
  async updateDeptMember(registInfo) {
    try {
      // console.log(registInfo);
      const { dept_id, member_id } = registInfo;
      const result = await models.member_dept.update(
        { dept_id },
        {
          where: {
            member_id,
          },
        }
      );

      return result;
    } catch (e) {
      logger.error(`[DeptService][updateDeptMember] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * @title unregistDeptMember
   * @description 부서 사원 등록
   * @param {company_id, dept_id} body
   * @return Success => 1
   * @return Failure => 0
   */
  async unregistDeptMember(registInfo) {
    try {
      const { member_id, dept_id } = registInfo;
      const result = await models.member_dept.destroy({
        where: { dept_id, member_id },
      });

      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[DeptService][unregistDeptMember] Error: ${e.message}`);
      throw e;
    }
  }
}
