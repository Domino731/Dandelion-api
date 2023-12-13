import { IsNotEmpty, IsNumber } from 'class-validator';

export class AcceptInvitationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
