export default {
  getAlimtalkList() {
    return `SELECT
        at.id,
        at.sender,
        at.receiver,
        at.content,
        at.apiResult,
        at.created_at,
        at.resultDetail,
        at.type,
        at.created_at,
        co.company_nm as sender_nm,
        cu.customer_nm as receiver_nm
    FROM
        alimtalk at
        INNER JOIN company co ON co.company_id = at.sender
        INNER JOIN customer cu ON cu.customer_id = at.receiver
    ORDER BY
      at.created_at DESC;
    `;
  },
  getAlimtalk() {
    return `SELECT
        at.id,
        at.sender,
        at.receiver,
        at.content,
        at.apiResult,
        at.created_at,
        at.resultDetail,
        at.type,
        co.company_nm as sender_nm,
        cu.customer_nm as receiver_nm
    FROM
        alimtalk at
        INNER JOIN company co ON co.company_id = at.sender
        INNER JOIN customer cu ON cu.customer_id = at.receiver
    WHERE
        at.sender = :company_id
    ORDER BY
      at.created_at DESC;
    `;
  },
};
