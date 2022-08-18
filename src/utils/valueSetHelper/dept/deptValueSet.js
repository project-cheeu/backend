export default {
    /**
     * 
     * @param {req data} DeptInfo
     * @param {pageing data} pageingData  
     * 전체  부서에 대한 조회 
     */
    getDeptInfo(DeptInfo, pageingData) {
        let resultData = {
            skipSize: pageingData.skipSize,
            contentSize: pageingData.contentSize,
            company_id: DeptInfo.company_id,
            deptKeyword: DeptInfo.deptKeyword
        }
        return resultData
    },
    /**
     * 
     * @param {req data} getDeptDetailInfo
     * 특정 부서에 대한 상세 조회 
     */
    getDeptDetailInfo(getDeptDetailInfo) {
        let resultData = {
            company_id: getDeptDetailInfo.company_id,
            dept_id: getDeptDetailInfo.dept_id
        }
        return resultData
    },
    /**
     * 
     * @param {req body} insertDeptData
     * 부서 생성
     */
    insertDeptData(insertDeptData) {
        let resultData = {
            dept_nm: insertDeptData.dept_nm,
            dept_manager: insertDeptData.dept_manager,
            company_id: insertDeptData.company_id,
            dept_addr: insertDeptData.dept_addr
        }
        return resultData
    },
    /**
     * 
     * @param {req body} updateDeptData 
     * 부서 수정
     */
    updateDeptData(updateDeptData) {
        let resultData = {
            dept_nm: updateDeptData.dept_nm,
            dept_manager: updateDeptData.dept_manager,
            company_id: updateDeptData.company_id,
            dept_id : updateDeptData.dept_id,
            dept_addr: updateDeptData.dept_addr,
            dept_use_yn : updateDeptData.dept_use_yn
        }
        return resultData
    }
}