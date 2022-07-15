import { BaseEntity } from 'typeorm';
export declare class Auth extends BaseEntity {
    id: number;
    email: string;
    password: string;
}
