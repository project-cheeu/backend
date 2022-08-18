export default {
  resSucSet(data) {
    return {
      resultMessage: 'Success',
      resultCode: 200,
      resultData: data[0],
    };
  },
  resSucMultiSet(data) {
    return {
      resultMessage: 'Success',
      resultCode: 200,
      resultData: data,
    };
  },
  resErrorSet(data) {
    return {
      resultMessage: 'Fail',
      resultCode: 500,
      resultData: data.toString(),
    };
  },
  resAllowException(data) {
    return {
      resultMessage: 'Success',
      resultCode: 200,
      resultData: [],
    };
  },
  resStatusCode(data) {
    if (data === 'ALLOW_EXCEPTION') {
      return 200;
    } else if (data === undefined || data === '') {
      return 500;
    } else if (data === null || data === 'null') {
      return 200;
    } else {
      return 200;
    }
  },
  resReturn(code, data, res) {
    // console.log(code)
    // console.log(data)
    return res.status(code).json(data);
  },
};
