export default {
  /**
   *
   * @param {req data} CustomerInfo
   */
  getCustomerInfo(CustomerInfo, pageingData) {
    let resultData = {
      customer_nm: CustomerInfo.customerNm,
      skipSize: pageingData.skipSize,
      contentSize: pageingData.contentSize,
    };
    return resultData;
  },

  insertCustomerData(insertCustomerData) {
    let resultData = {
      customer_login_id: insertCustomerData.customer_login_id,
      customer_nm: insertCustomerData.customer_nm,
      customer_email_addr: insertCustomerData.customer_email_addr,
      customer_login_pw: insertCustomerData.customer_login_pw,
      customer_home_addr: insertCustomerData.customer_home_addr,
      customer_phone_num: insertCustomerData.customer_phone_num,
      customer_thumbnail_img: insertCustomerData.customer_thumbnail_img
        ? insertCustomerData.customer_thumbnail_img
        : '',
    };
    return resultData;
  },

  updateCustomerData(updateCustomerData) {
    let resultData = {
      customer_id: updateCustomerData.customer_id,
      customer_nm: updateCustomerData.customer_nm,
      customer_email_addr: updateCustomerData.customer_email_addr,
      customer_home_addr: updateCustomerData.customer_home_addr,
      customer_phone_num: updateCustomerData.customer_phone_num,
    };
    return resultData;
  },
  customerPasswordData(updateCustomerPassword) {
    let resultData = {
      customer_login_id: updateCustomerPassword.customer_login_id,
      customer_login_pw: updateCustomerPassword.customer_login_pw,
      before_pw: updateCustomerPassword.before_pw,
    };
    return resultData;
  },
};
