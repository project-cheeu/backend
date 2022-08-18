export default {
  getSurveyList() {
    return `SELECT
    sa.*,
    mt.created_at
FROM
    survey_answer sa
    INNER JOIN medical_table mt ON sa.medical_id = mt.medical_id        
    INNER JOIN customer cu ON cu.customer_id = mt.customer_id
    INNER JOIN company co ON co.company_id = mt.company_id
WHERE
  mt.customer_id = :customer_id
AND
co.company_id = :company_id;
    `;
  },
  getSurveyListAll() {
    return `SELECT
    sa.*,
    mt.created_at
FROM
    survey_answer sa
    INNER JOIN medical_table mt ON sa.medical_id = mt.medical_id        
    INNER JOIN customer cu ON cu.customer_id = mt.customer_id
    INNER JOIN company co ON co.company_id = mt.company_id
WHERE
  mt.customer_id = :customer_id;
    `;
  },
  getSurvey() {
    return `SELECT
    sa.*,
    mt.created_at
FROM
    survey_answer sa
    INNER JOIN medical_table mt ON sa.medical_id = mt.medical_id        
    INNER JOIN customer cu ON cu.customer_id = mt.customer_id
    INNER JOIN company co ON co.company_id = mt.company_id
WHERE
  mt.customer_id = :customer_id
AND
co.company_id = :company_id;
AND
    sa.medical_id = :medical_id
    `;
  },
};
