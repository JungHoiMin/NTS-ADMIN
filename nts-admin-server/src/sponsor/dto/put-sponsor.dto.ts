import { PartialType } from '@nestjs/swagger';
import { CreateSponsorDto } from './post-sponsor.dto';

export class UpdateSponsorDto extends PartialType(CreateSponsorDto) {}
