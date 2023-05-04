import {
  BAD_REQUEST_STATUS,
  NOT_FOUND,
  SERVER_ERROR_STATUS,
} from '../constants/constants';

class ApiRequestError extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiRequestError(BAD_REQUEST_STATUS, message);
  }

  static notFound(message: string) {
    return new ApiRequestError(NOT_FOUND, message);
  }

  static internal(message: string) {
    return new ApiRequestError(SERVER_ERROR_STATUS, message);
  }
}

export default ApiRequestError;
