export class JwtPayloadDto {
  id: number;
  permissions: string[];
  iat?: number;
  exp?: number;
}
