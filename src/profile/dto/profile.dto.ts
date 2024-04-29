import { profileQuery } from '../../common/queries';

export class ProfileDto {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;

  get query() {
    return profileQuery;
  }
}
