import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async jwtLogin(id: string) {
    const payload = { id };
    return this.jwtService.sign(payload); // token
  }
}
