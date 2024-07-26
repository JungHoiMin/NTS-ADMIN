import { PartialType } from '@nestjs/swagger';
import { CreateCenterInfoDto } from './create-center-info.dto';

export class UpdateCenterInfoDto extends PartialType(CreateCenterInfoDto) {}
