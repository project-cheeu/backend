export default {
  getCompanyVideoList() {
    return `
    SELECT
        video_id,
        video_title,
        video_url,
        video_yn,
        created_at,
        company_id
    FROM
        company_video
    WHERE
        company_id = :company_id`;
  },
};
