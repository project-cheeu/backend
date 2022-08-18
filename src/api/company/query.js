export default {
  getCompanyList() {
    return `SELECT
            co.company_id,
            co.company_nm,
            co.company_num,
            co.company_num,
            co.company_regist_num,
            co.company_addr,
            co.company_tel,
            co.created_at,
            co.modified_at,
            co.use_yn,
            (SELECT COUNT(*) FROM member_company WHERE company_id = co.company_id) as member_count
        FROM
            company co;`;
  },
  getCompanyInfo() {
    return `
    SELECT
      company_id,
      company_nm,
      company_tel,
      company_addr,
      company_mail,
      company_num,
      company_regist_num,
      created_at,
      modified_at,
      use_yn,
      ebook_url
    FROM
      company
    WHERE
      company_id = :company_id;`;
  },
  getDeptInfo() {
    return `
    SELECT
      dept_id,
      company_id,
      dept_nm,
      created_at,
      modify_at,
      dept_yn,
      dept_manager
    FROM
      dept
    WHERE
      company_id = :company_id;`;
  },
  getCompanyMemberInfo() {
    return `
    SELECT
      mc.company_id,
      mc.member_id,
      me.member_id,
      me.member_login_id,
      me.member_nm,
      me.member_div,
      me.created_at,
      me.modify_at,
      me.use_yn
    FROM
      member_company mc
      INNER JOIN member me ON me.member_id = mc.member_id
    WHERE
      mc.company_id = :company_id;`;
  },
  getCompanyAssetsInfo() {
    return `
    SELECT
      assets_id,
      logo_url,
      ambient_environment,
      operating_time,
      company_thumbnail,
      company_guidance,
      company_signature,
      company_id
    FROM
      company_assets
    WHERE
      company_id = :company_id;`;
  },
};
