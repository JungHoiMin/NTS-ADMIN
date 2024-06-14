import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class CreateManagerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  pw?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  teamType: 'NTS' | 'AM';

  @ApiProperty()
  teamId: number;

  @ApiProperty()
  joinDate?: Date;
}

export class LoginManagerDto extends PickType(CreateManagerDto, ['id', 'pw'] as const) {}
