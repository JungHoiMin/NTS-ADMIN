import { ApiProperty } from '@nestjs/swagger';

export class CreateInsuranceDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  suffix: string;

  @ApiProperty()
  NTSTeamId?: number;

  toString() {
    return `${this.name}(${this.code})`;
  }
}
