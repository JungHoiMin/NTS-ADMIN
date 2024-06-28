import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './post-manager.dto';

export class UpdateManagerDto extends PartialType(OmitType(CreateManagerDto, ['id'] as const)) {
  prevPw: string;
}
