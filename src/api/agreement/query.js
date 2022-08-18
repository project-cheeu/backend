export default {
  getAgreementFormList() {
    return `
    SELECT 
        af.form_id,
        af.form_nm,
        af.form_content,
        af.usage,
        af.created_at
    FROM
        agreement_form af
        INNER JOIN company co ON co.company_id = af.company_id
    WHERE
        af.company_id = :company_id;
    `;
  },
  getAgreement() {
    return `
    SELECT
      ua.agreement_id,
      ua.company_id,
      ua.customer_id,
      ua.img_url,
      ua.created_at,
      ua.form_id,
      af.form_nm,
      af.form_content
    FROM
      user_agreement ua
        INNER JOIN agreement_form af ON af.form_id = ua.form_id
    WHERE
      ua.customer_id = :customer_id
    AND
      ua.company_id = :company_id;
    `;
  },
};
