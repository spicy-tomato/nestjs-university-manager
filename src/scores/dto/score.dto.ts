import { scoreQuery } from '../../common/queries';

export class ScoreDto {
  id: string;
  score: number | null;
  courseClassId: string;

  static get query() {
    return scoreQuery;
  }
}
