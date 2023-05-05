import { UNAUTORIZED } from '../constants/errors-constants';

class UnauthErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTORIZED;
  }
}

export default UnauthErr;
