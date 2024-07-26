import { PartialType } from '@nestjs/swagger';
import { CreateCallHandlerModuleDto } from './create-call-handler-module.dto';

export class UpdateCallHandlerModuleDto extends PartialType(CreateCallHandlerModuleDto) {}
