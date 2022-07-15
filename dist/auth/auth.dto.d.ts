import { LoginRequest, RegisterRequest, ValidateRequest } from './auth.pb';
export declare class LoginRequestDto implements LoginRequest {
    readonly email: string;
    readonly password: string;
}
export declare class RegisterRequestDto implements RegisterRequest {
    readonly email: string;
    readonly password: string;
}
export declare class ValidateRequestDto implements ValidateRequest {
    readonly token: string;
}
