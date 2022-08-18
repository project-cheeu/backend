export default {
  getScheduleByCompany() {
    return `
    SELECT
      company_id,
      schedule_date,
      schedule_time,
      schedule_number,
      shutdown
    FROM
      company_schedule
    WHERE
      company_id = :company_id;
    `;
  },
  getScheduleCount() {
    return `
    SELECT
      COUNT(*) as reservation_count
    FROM
      medical_reservation mer
    WHERE
    STR_TO_DATE(CONCAT(mer.reservation_date,mer.reservation_time),'%Y-%m-%d %H:%i') = STR_TO_DATE(:schedule, '%Y-%m-%d %H:%i')
    `;
  },
  getScheduleReservation() {
    return `
    SELECT
      mer.reservation_id,
      mer.company_id,
      mer.customer_id,
      mer.created_at,
      mer.completed_at,
      mer.medical_subject,
      mer.reservation_status,
      mer.reservation_time,
      mer.reservation_comment,
      cu.customer_nm
    FROM
      medical_reservation mer
      INNER JOIN customer cu ON cu.customer_id = mer.customer_id
    WHERE
      mer.company_id = :company_id
    AND
      STR_TO_DATE(CONCAT(mer.reservation_date,mer.reservation_time),'%Y-%m-%d %H:%i') = STR_TO_DATE(:schedule, '%Y-%m-%d %H:%i')
    `;
  },
};
