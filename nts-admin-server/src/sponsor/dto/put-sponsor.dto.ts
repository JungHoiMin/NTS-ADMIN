import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSponsorDto } from './post-sponsor.dto';

export class UpdateSponsorDto extends PartialType(OmitType(CreateSponsorDto, ['name'] as const)) {}
