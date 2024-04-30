import { AcademicYearDto } from '../../academic-years/dto';
import { ProfileDto } from '../../profile/dto';

class StudentScoreScoreDto {
  score: number | null;
  id: string;
  studentId: string;
  courseClassId: string;
}

export class StudentScoreDto {
  id: string;
  academicYear: AcademicYearDto;
  scores: StudentScoreScoreDto[];
}

export class StudentScoreListItemDto {
  id: string;
  profile: ProfileDto;
  score: number | null;
  studentId: string;
}
