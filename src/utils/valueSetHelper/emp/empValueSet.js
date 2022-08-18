export default {
    /**
     * 
     * @param {req data} EmpInfo
     * @param {pageing data} pageingData  
     * 전체  사원에 대한 조회 
     */
    getEmpInfo(EmpInfo, pageingData) {
        let resultData = {
            skipSize: pageingData.skipSize,
            contentSize: pageingData.contentSize,
            company_id: EmpInfo.company_id,
            dept_id : EmpInfo.dept_id,
            empKeyword: EmpInfo.empKeyword
        }
        return resultData
    },
    /**
     * 
     * @param {req data} EmpDetailInfo 
     * 특정 사원 조회
     */ 
    getEmpDetailInfo(EmpDetailInfo){
        let resultData = {
            company_id: EmpDetailInfo.company_id,
            dept_id : EmpDetailInfo.dept_id,
            emp_id: EmpDetailInfo.emp_id
        }
        return resultData
    },
    /**
     * 
     * @param {req data} EmpDetailInfo 
     * 사원 등록
    //  */
    EmpInsertInfo(EmpDetailInfo){
        let resultData = {
            emp_nm: EmpDetailInfo.emp_nm,
            emp_login_id: EmpDetailInfo.emp_login_id,
            emp_login_pw: EmpDetailInfo.emp_login_pw,
            emp_addr: EmpDetailInfo.emp_addr,
            emp_email_addr: EmpDetailInfo.emp_email_addr,
            emp_tel: EmpDetailInfo.emp_tel,
            emp_phone: EmpDetailInfo.emp_phone,
            company_id : EmpDetailInfo.company_id,
            dept_id : EmpDetailInfo.dept_id
        }
        return resultData
    },

    getEmpLoginId(loginId){
        let resultData = {
            emp_login_id: loginId.emp_login_id
        }
        return resultData
    }
}