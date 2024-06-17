import { ApiProperty } from '@nestjs/swagger';

export class CreateSponsorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  suffix: string;
}
