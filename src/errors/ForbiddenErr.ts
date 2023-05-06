import { FORBIDDEN_STATUS } from '../constants/constants';

class ForbiddenErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS;
  }
}

export default ForbiddenErr;
