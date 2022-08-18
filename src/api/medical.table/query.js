export default {
  checkSubjectCode() {
    return `SELECT
              subject_code_id,
              subject_nm,
              subject_desc
            FROM
                subject_code
            WHERE
              subject_nm LIKE :keyword
            OR
              subject_desc LIKE :keyword;`;
  },
  checkMedical() {
    return `SELECT
      COUNT(*) as count
      FROM
        medical_table
      WHERE
        customer_id=:customer_id
      AND
        medical_status != 'DONE'
      AND
        DATE_FORMAT(FROM_UNIXTIME(created_at), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
    `;
  },
  getMedicalListAll() {
    return `SELECT 
      mt.medical_id,
      cu.customer_nm,
      cu.customer_tel,
      mt.medical_status,
      mt.created_at,
      mt.completed_at,
      mt.customer_id,
      cm.company_id,
      cm.company_nm
    FROM medical_table mt
      INNER JOIN customer cu ON mt.customer_id = cu.customer_id
      INNER JOIN company cm ON mt.company_id = cm.company_id
    ORDER BY mt.created_at DESC,FIELD(mt.medical_status, 
        'RESERVATION',
        'RESERVATION_ACEPTING',
        'RESERVATION_CANCEL',
        'APPLICATION_COMPLETE',
        'SURVEY',
        'TREATMENT',
        'CONSULTING',
        'DONE',
        'RECEIVE',
        'APPLICATION',
        'CANCEL');`;
  },
  getMedicalList() {
    return `SELECT 
      cu.customer_nm,
      cu.customer_tel,
      cu.customer_num,
      mt.medical_status,
      mt.created_at,
      mt.completed_at,
      mt.customer_id,
      mt.medical_id,
      cm.company_id,
      cm.company_nm,
      (SELECT COUNT(*) FROM survey_answer WHERE medical_id = mt.medical_id) as presurvey
    FROM medical_table mt
      INNER JOIN customer cu ON mt.customer_id = cu.customer_id
      INNER JOIN company cm ON mt.company_id = cm.company_id
    WHERE
      mt.company_id=:company_id
    AND
      DATE_FORMAT(FROM_UNIXTIME(mt.created_at), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
    ORDER BY FIELD(mt.medical_status, 
    'RESERVATION',
    'RESERVATION_ACEPTING',
    'RESERVATION_CANCEL',
    'APPLICATION_COMPLETE',
    'SURVEY',
    'TREATMENT',
    'CONSULTING',
    'DONE',
    'RECEIVE',
    'APPLICATION',
    'CANCEL'), mt.created_at DESC;`;
  },
  getMedicalStatus() {
    return `SELECT 
    cu.customer_nm,
    cu.customer_tel,
    cu.customer_num,
    mt.medical_status,
    mt.created_at,
    mt.completed_at,
    mt.customer_id,
    cm.company_id,
    cm.company_nm,
    mt.medical_id,
    (SELECT COUNT(customer_id) FROM medical_table WHERE customer_id = mt.customer_id) as medical_count
  FROM medical_table mt
    INNER JOIN customer cu ON mt.customer_id = cu.customer_id
    INNER JOIN company cm ON cm.company_id = mt.company_id
  WHERE
    mt.company_id=:company_id
    ORDER BY mt.created_at DESC,FIELD(mt.medical_status, 
      'RESERVATION',
      'RESERVATION_ACEPTING',
      'RESERVATION_CANCEL',
      'APPLICATION_COMPLETE',
      'SURVEY',
      'TREATMENT',
      'CONSULTING',
      'DONE',
      'RECEIVE',
      'APPLICATION',
      'CANCEL');`;
  },
  getMedicalDetail() {
    return `SELECT
      mt.medical_id,
      mt.medical_status,
      mt.created_at,
      mt.completed_at,
      cu.*,
      sa.answer_id,
      (SELECT COUNT(customer_id) FROM medical_table WHERE customer_id = mt.customer_id) as medical_count
    FROM medical_table mt
      INNER JOIN customer cu ON mt.customer_id = cu.customer_id
      LEFT OUTER JOIN survey_answer sa ON mt.medical_id = sa.medical_id
    WHERE
      mt.medical_id = :medical_id;
    `;
  },

  checkCustomerMedical() {
    return `SELECT
      mt.company_id,
      co.company_nm,
      mt.medical_id,
      cu.customer_id,
      cu.customer_tel,
      mt.created_at,
      mt.medical_subject
  FROM
    company co
      INNER JOIN medical_table mt ON co.company_id = mt.company_id
      INNER JOIN customer cu ON cu.customer_id = mt.customer_id
  WHERE
  cu.customer_id = :customer_id
  ORDER BY mt.created_at;`;
  },
  getAlimtalkData() {
    return `SELECT
    co.company_id,
      co.company_nm,
      co.company_tel,
      cu.customer_id,
      cu.customer_nm,
      cu.customer_tel,
      mt.created_at,
      co.ebook_url
    FROM medical_table mt
      INNER JOIN company co ON co.company_id = mt.company_id
      INNER JOIN customer cu ON cu.customer_id = mt.customer_id
    WHERE
      medical_id = :medical_id;
    `;
  },
};
