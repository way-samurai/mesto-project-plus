import { BAD_REQUEST_STATUS } from '../constants/constants';

class BadRequestErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

export default BadRequestErr;
