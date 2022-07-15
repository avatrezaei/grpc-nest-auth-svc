import { JwtService as Jwt } from '@nestjs/jwt';
import { Auth } from '../auth.entity';
export declare class JwtService {
    private readonly repository;
    private readonly jwt;
    constructor(jwt: Jwt);
    decode(token: string): Promise<unknown>;
    validateUser(decoded: any): Promise<Auth>;
    generateToken(auth: Auth): string;
    isPasswordValid(password: string, userPassword: string): boolean;
    encodePassword(password: string): string;
    verify(token: string): Promise<any>;
}
