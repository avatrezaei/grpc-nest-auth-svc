import { RegisterRequestDto, LoginRequestDto, ValidateRequestDto } from '../auth.dto';
import { LoginResponse, RegisterResponse, ValidateResponse } from '../auth.pb';
export declare class AuthService {
    private readonly repository;
    private readonly jwtService;
    register({ email, password }: RegisterRequestDto): Promise<RegisterResponse>;
    login({ email, password }: LoginRequestDto): Promise<LoginResponse>;
    validate({ token }: ValidateRequestDto): Promise<ValidateResponse>;
}
