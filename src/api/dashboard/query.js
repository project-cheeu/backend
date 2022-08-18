export default {
  getAdminDashboard() {
    return `SELECT
        mt.medical_status,
        COUNT(mt.medical_status) as status_count
    FROM
        medical_table mt
        INNER JOIN company co ON mt.company_id = co.company_id
    WHERE
	    DATE_FORMAT(FROM_UNIXTIME(mt.created_at), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
    GROUP BY mt.medical_status;`;
  },
  getDashboardCount() {
    return `
    SELECT
      mt.medical_status,
      COUNT(mt.medical_status) as status_count
    FROM medical_table mt
    WHERE
        mt.company_id = :company_id
    AND
      DATE_FORMAT(FROM_UNIXTIME(mt.created_at), '%Y-%m-%d') = DATE_FORMAT(NOW(),  '%Y-%m-%d')
    GROUP BY mt.medical_status
    ORDER BY FIELD(mt.medical_status, 'RESERVATION', 'RESERVATION_ACEPTING', 'RESERVATION_CANCEL', 'APPLICATION_COMPLETE', 'SURVEY', 'TREATMENT', 'CONSULTING', 'DONE', 'RECEIVE', 'APPLICATION', 'CANCEL');`;
  },
  getAlimtalkCount() {
    return `
    SELECT
    	COUNT(*) as alimtalk
    FROM
	    alimtalk
    WHERE
	    sender = :company_id;
    `;
  },
  getSurveyCount() {
    return `
    SELECT
      DISTINCT COUNT( *) as survey
    FROM
      survey_answer sa
        INNER JOIN medical_table mt ON mt.medical_id = sa.medical_id
    WHERE
      mt.company_id = :company_id;
    `;
  },
  getMedicalCount() {
    return `
    SELECT
      DISTINCT COUNT(*) as medical
    FROM
      medical_table
    WHERE
      company_id =  :company_id;
    `;
  },
  getCalendar() {
    return `
    SELECT
      cu.customer_nm as title,
      DATE_FORMAT(FROM_UNIXTIME(mt.created_at), '%Y-%m-%d') as date,
      mt.medical_id,
      mt.customer_id
    FROM
      medical_table mt
      INNER JOIN customer cu ON cu.customer_id = mt.customer_id
    WHERE
      mt.company_id =  :company_id;
    `;
  },
};
