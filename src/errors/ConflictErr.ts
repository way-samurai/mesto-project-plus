import { CONFLICT_STATUS } from '../constants/constants';

class ConflictErr extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_STATUS;
  }
}

export default ConflictErr;
