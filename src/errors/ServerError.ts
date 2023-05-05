import { SERVER_ERROR_STATUS } from '../constants/constants';

class ServerErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = SERVER_ERROR_STATUS;
  }
}

export default ServerErr;