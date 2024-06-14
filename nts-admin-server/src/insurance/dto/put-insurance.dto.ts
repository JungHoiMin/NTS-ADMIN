import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateInsuranceDto } from './post-insurance.dto';

export class UpdateInsuranceDto extends PartialType(
  OmitType(CreateInsuranceDto, ['code'] as const),
) {}
