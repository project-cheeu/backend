export default {
  getNoticeList() {
    return `
    SELECT
      notice_id,
      notice_title,
      notice_content,
      notice_order,
      modified_at,
      modified_yn,
      company_id
    FROM
        company_notice
    WHERE
        company_id = :company_id`;
  },
};
