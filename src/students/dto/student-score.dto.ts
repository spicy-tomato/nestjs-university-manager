import { ProfileDto } from '../../profile/dto';

export class StudentScoreDto {
  id: string;
  profile: ProfileDto;
  score: number | null;
  studentId: string;
}
