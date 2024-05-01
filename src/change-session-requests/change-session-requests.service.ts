import { Injectable } from '@nestjs/common';
import { CreateChangeSessionRequestDto } from './dto/create-change-session-request.dto';
import { UpdateChangeSessionRequestDto } from './dto/update-change-session-request.dto';

@Injectable()
export class ChangeSessionRequestsService {
  create(createChangeSessionRequestDto: CreateChangeSessionRequestDto) {
    return 'This action adds a new changeSessionRequest';
  }

  findAll() {
    return `This action returns all changeSessionRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} changeSessionRequest`;
  }

  update(
    id: number,
    updateChangeSessionRequestDto: UpdateChangeSessionRequestDto,
  ) {
    return `This action updates a #${id} changeSessionRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} changeSessionRequest`;
  }
}
