export default {
  nullCheck(data) {
    if (data === undefined || data === '') {
      return true;
    } else if (data === null || data === 'null') {
      return false;
    } else {
      return false;
    }
  },
  nullCheckAllow(data) {
    if (data === 'ALLOW_EXCEPTION') {
      return false;
    }
    return true;
  },
  typeCheckValue(data) {
    switch (data.type_id) {
      case '0':
        return true;
      default:
        return false;
    }
  },
  deptCheckValue(data) {
    switch (data.dept_id) {
      case '0':
        return true;
      default:
        return false;
    }
  },
  keyWordCheckValue(data) {
    // console.log('data!!', data);
    if (data.hasOwnProperty('goodsKeyword')) {
      switch (data.goodsKeyword) {
        case "''":
          return true;
        default:
          return false;
      }
    }
    if (data.hasOwnProperty('deptKeyword')) {
      switch (data.deptKeyword) {
        case "''":
          return true;
        default:
          return false;
      }
    }
    if (data.hasOwnProperty('empKeyword')) {
      switch (data.empKeyword) {
        case "''":
          return true;
        default:
          return false;
      }
    }
    if (data.hasOwnProperty('customer_nm')) {
      // console.log("여기지?")
      switch (data.customer_nm) {
        case "''":
          // console.log("그리고 여기지")
          return true;
        default:
          return false;
      }
    }
  },
};
