export default {
  getCusotmer() {
    return `SELECT
      DISTINCT cu.customer_id,
      cu.customer_nm,
      cu.customer_tel,
      cu.customer_addr,
      cu.agree_date,
      cu.agree_optional,
      cu.created_at,
      cu.modified_at,
      cu.access_platform,
      cu.customer_num,
      cu.customer_yn,
      (SELECT COUNT(*) FROM medical_table WHERE customer_id = cu.customer_id AND company_id = :company_id ) as medical_count
    FROM
      customer cu
        INNER JOIN medical_table mt ON mt.customer_id = cu.customer_id
        INNER JOIN company co ON co.company_id = mt.company_id
    WHERE
	    mt.company_id = :company_id;`;
  },
  getCustomerDetail() {
    return `SELECT
        cu.customer_id,
        cu.customer_nm,
        cu.customer_tel,
        cu.customer_addr,
        cu.customer_num,
        cu.agree_date,
        cu.agree_optional,
        cu.created_at,
        cud.blood_type,
        cud.customer_height,
        cud.customer_weight,
        (SELECT COUNT(*) FROM medical_table WHERE customer_id = cu.customer_id AND company_id = :company_id ) as medical_count,
        (SELECT AVG(IFNULL(completed_at, created_at)-created_at) FROM medical_table WHERE customer_id=cu.customer_id AND company_id=:company_id ) as wating_avg,
        (SELECT SUM(IFNULL(completed_at, created_at)-created_at) FROM medical_table WHERE customer_id=cu.customer_id AND company_id=:company_id ) as wating_sum
    FROM
      customer cu
      LEFT OUTER JOIN customer_detail cud ON cu.customer_id = cud.customer_id
    WHERE cu.customer_id = :customer_id
    AND cu.customer_yn = 1`;
  },
  getCustomerMedical() {
    return `
    SELECT
      cu.customer_id,
      cu.customer_nm,
      cu.customer_tel,
      cu.customer_addr,
      cu.customer_num,
      cud.blood_type,
      cud.customer_height,
      cud.customer_weight
    FROM
      customer cu
      INNER JOIN customer_detail cud ON cu.customer_id = cud.customer_id
    WHERE
      cu.customer_id = :customer_id;`;
  },
  checkPreSurvey() {
    return `SELECT
        cu.customer_id,
        cu.customer_nm,
        cu.customer_tel,
        cu.customer_addr,
        cu.customer_num,
        (SELECT COUNT(*) FROM survey_answer WHERE medical_id = sa.medical_id)
    FROM customer cu 
      INNER JOIN medical_table mt ON cu.customer_id = mt.customer_id
      INNER JOIN survey_answer sa ON mt.medical_id = sa.medical_id
      WHERE cu.customer_tel = :customer_tel
    AND cu.customer_yn = 1`;
  },
  searchCustomer() {
    return `
    SELECT
      cu.customer_id,
      cu.customer_nm,
      cu.customer_addr,
      cu.agree_date,
      cu.agree_optional,
      cu.created_at,
      cu.modified_at,
      cu.access_platform,
      cu.customer_num,
      cu.customer_yn,
      cu.customer_tel
    FROM
      chief_customer ccu
      INNER JOIN customer cu ON ccu.customer_tel = cu.customer_tel
    WHERE
      ccu.customer_tel = :customer_tel
    AND
      ccu.chief_nm = cu.customer_nm;
    `;
  },
  checkQuery() {
    return `
    SELECT
      COUNT(customer_tel) as count
    FROM
      chief_customer
    WHERE
      customer_tel = :customer_tel;
    `;
  },
  getCustomerRecently() {
    return `
    SELECT
      mt.company_id,
      mt.customer_id,
      mt.created_at,
      co.company_nm,
      coa.logo_url
    FROM
      customer cu
      INNER JOIN medical_table mt ON mt.customer_id = cu.customer_id
      INNER JOIN company co ON co.company_id = mt.company_id
      LEFT OUTER JOIN company_assets coa ON coa.company_id = co.company_id
    WHERE
      cu.customer_id = :customer_id
    ORDER BY mt.created_at DESC`;
  },
  getCustomerEmergency() {
    return `
    SELECT
      customer_id,
      emergency_relation1,
      emergency_relation2,
      emergency_relation3,
      emergency_relation4,
      emergency_tel1,
      emergency_subtel1,
      emergency_tel2,
      emergency_subtel2,
      emergency_tel3,
      emergency_subtel3,
      emergency_tel4,
      emergency_subtel4
    FROM
      customer_emergency
    WHERE
      customer_id = :customer_id`;
  },
  getCustomerDumpList() {
    return `
    SELECT
      dump_id,
      customer_nm,
      customer_num,
      customer_tel,
      customer_addr,
      created_at,
      modified_at,
      company_id
    FROM
      customer_dump
    WHERE
      company_id = :company_id`;
  },
  searchCustomerDump() {
    return `
    SELECT
      dump_id,
      customer_nm,
      customer_num,
      customer_tel,
      customer_addr,
      created_at,
      modified_at,
      company_id
    FROM
      customer_dump
    WHERE
      company_id = :company_id
    AND
      customer_tel = :customer_tel`;
  },
};
