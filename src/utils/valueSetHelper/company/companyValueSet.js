export default {
    /**
     * 
     * @param {req data} companyData
     */
    getCompanyInfo(companyData) {
        let resultData = {
            company_id: companyData.company_id
        }
        return resultData
    },
    /**
     * 
     * @param {req body} inserGoodsData
     */
    insertCompanyData(inserGoodsData) {
        let resultData = {
            company_nm: inserGoodsData.company_nm,
            company_tel: inserGoodsData.company_tel,
            company_addr: inserGoodsData.company_addr,
            company_email: inserGoodsData.company_email,
            company_num: inserGoodsData.company_num,
            company_regist_num: inserGoodsData.company_regist_num
        }
        return resultData
    },
    /**
     * 
     * @param {req body} updateCompanyData
     */
    updateCompanyData(updateCompanyData) {
        let resultData = {
            company_nm: updateCompanyData.company_nm,
            company_tel: updateCompanyData.company_tel,
            company_addr: updateCompanyData.company_addr,
            company_email: updateCompanyData.company_email,
            company_num: updateCompanyData.company_num,
            company_regist_num: updateCompanyData.company_regist_num,
            company_id: updateCompanyData.company_id,
        }
        return resultData
    }
}