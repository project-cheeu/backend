export default {
  managerLogin() {
    return `
    SELECT
        manager_id,
        manager_login_id,
        manager_pin,
        manager_nm
    FROM
        manager
    WHERE
        manager_login_id = :manager_login_id
    AND
        manager_login_pw = :manager_login_pw;`;
  },
};
