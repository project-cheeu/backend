export default {
  checkCompany() {
    return `
        SELECT
            *
        FROM
            company
        WHERE
            company_id = :company_id;`;
  },
  getWaitList() {
    return `
    SELECT
      mt.medical_id,
      mt.company_id,
      mt.customer_id,
      mt.created_at,
      mt.completed_at,
      mt.medical_subject,
      mt.medical_status,
      cu.customer_nm,
      cu.customer_tel
    FROM
      medical_table mt
      INNER JOIN customer cu ON mt.customer_id = cu.customer_id
    WHERE
      mt.company_id = :company_id
    AND
      mt.medical_status = 'APPLICATION_COMPLETE'
    ORDER BY mt.created_at ASC;
    `;
  },
};
