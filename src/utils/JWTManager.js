import JWT from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

export default class Authenticator {
  /**
   * 생성자
   */
  constructor() {
    if (!Authenticator.instance) {
      Authenticator.instance = this;
    }
    return Authenticator.instance;
  }

  /**
   * 토큰생성
   */
  async createSign(data, expiresIn) {
    return JWT.sign(data, jwtConfig.secret, { expiresIn });
  }

  /**
   * 토큰입증
   */
  async verify(token) {
    try {
      const decoded = await JWT.verify(token, jwtConfig.secret);
      if (decoded) return true;
      else return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * decoded 전용
   */
  async decoded(token) {
    return JWT.verify(token, jwtConfig.secret);
  }
}
