export default {
  getMember() {
    return `SELECT
        m.member_id,
        m.member_login_id,
        m.member_login_pw,
        m.member_pin,
        m.member_nm,
        m.member_div,
        d.dept_nm,
        m.created_at,
        m.modify_at,
        m.use_yn
    FROM member m
        INNER JOIN member_company mc ON mc.member_id = m.member_id
        INNER JOIN member_dept md ON md.member_id = m.member_id
        INNER JOIN dept d ON d.dept_id = md.dept_id
    WHERE
        mc.company_id = :company_id
        `;
  },
};
