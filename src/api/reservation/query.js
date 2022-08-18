export default {
  getReservationListAll() {
    return `
    SELECT
        res.reservation_id,
        res.company_id,
        res.customer_id,
        res.created_at,
        res.completed_at,
        res.medical_subject,
        res.reservation_status,
        res.reservation_time,
        res.reservation_comment,
        co.company_nm,
        cu.customer_nm
    FROM
        medical_reservation res
        INNER JOIN customer cu ON cu.customer_id = res.customer_id
        INNER JOIN company co ON co.company_id = res.company_id;`;
  },
  getReservationListByCompnay() {
    return `
    SELECT
        res.reservation_id,
        res.company_id,
        res.customer_id,
        res.created_at,
        res.completed_at,
        res.medical_subject,
        res.reservation_status,
        res.reservation_date,
        res.reservation_time,
        res.reservation_comment,
        cu.customer_nm
    FROM
        medical_reservation res
        INNER JOIN customer cu ON cu.customer_id = res.customer_id
    WHERE
        res.company_id = :company_id`;
  },
  getReservationListByCustomer() {
    return `
    SELECT
        res.reservation_id,
        res.company_id,
        res.customer_id,
        res.created_at,
        res.completed_at,
        res.medical_subject,
        res.reservation_status,
        res.reservation_date,
        res.reservation_time,
        res.reservation_comment,
        co.company_nm
    FROM
        medical_reservation res
        INNER JOIN company co ON co.company_id = res.company_id
    WHERE
        res.customer_id = :customer_id`;
  },
  getReservatinById() {
    return `
    SELECT
        reservation_id,
        company_id,
        customer_id,
        created_at,
        completed_at,
        medical_subject,
        reservation_status,
        reservation_date,
        reservation_time,
        reservation_comment
    FROM
        medical_reservation
    WHERE
        reservation_id = :reservation_id`;
  },
};
