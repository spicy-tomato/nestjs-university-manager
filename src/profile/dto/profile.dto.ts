import { profileQuery } from '../../common/queries';

export class ProfileDto {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;

  static get query() {
    return profileQuery;
  }
}
