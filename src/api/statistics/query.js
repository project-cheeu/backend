export default {
  getCustomerCountByYear(gender) {
    return `SELECT
        DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m') as medical_date,
        COUNT(mt.customer_id) as customer_count
    FROM
        medical_table mt
        INNER JOIN customer cu ON mt.customer_id = cu.customer_id
    WHERE DATE_FORMAT(from_unixtime(mt.created_at), '%Y') = :medical_date
    ${gender !== '-1' ? `AND MOD(LEFT(cu.customer_num, 8),2) =${gender}` : ''}
    GROUP BY DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m');`;
  },
  getCustomerCountByMonth(gender) {
    return `SELECT
        DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m-%d') as medical_date,
        COUNT(mt.customer_id) as customer_count
    FROM
        medical_table mt
        INNER JOIN customer cu ON mt.customer_id = cu.customer_id
    WHERE DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m') = :medical_date
    ${gender !== '-1' ? `AND MOD(LEFT(cu.customer_num, 8),2) = ${gender}` : ''}
    GROUP BY DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m-%d');`;
  },
  getCustomerCountByDuration(gender) {
    return `SELECT
        DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m-%d') as medical_date,
        COUNT(mt.customer_id) as customer_count
    FROM
        medical_table mt
        INNER JOIN customer cu ON mt.customer_id = cu.customer_id
    WHERE DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m-%d') BETWEEN :start_date AND :end_date
    ${gender !== '-1' ? `AND MOD(LEFT(cu.customer_num, 8),2) =${gender}` : ''}
    GROUP BY DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m-%d');`;
  },
};
// WHERE DATE_FORMAT(from_unixtime(mt.created_at), '%Y-%m') BETWEEN DATE_FORMAT(:start_date, '%Y-%m') AND DATE_FORMAT(:end_date, '%Y-%m')
