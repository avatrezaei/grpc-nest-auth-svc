"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_service_1 = require("./jwt.service");
const auth_entity_1 = require("../auth.entity");
let AuthService = class AuthService {
    async register({ email, password }) {
        let auth = await this.repository.findOne({ where: { email } });
        if (auth) {
            return { status: common_1.HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
        }
        auth = new auth_entity_1.Auth();
        auth.email = email;
        auth.password = this.jwtService.encodePassword(password);
        await this.repository.save(auth);
        return { status: common_1.HttpStatus.CREATED, error: null };
    }
    async login({ email, password }) {
        const auth = await this.repository.findOne({ where: { email } });
        if (!auth) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
        }
        const isPasswordValid = this.jwtService.isPasswordValid(password, auth.password);
        if (!isPasswordValid) {
            return { status: common_1.HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
        }
        const token = this.jwtService.generateToken(auth);
        return { token, status: common_1.HttpStatus.OK, error: null };
    }
    async validate({ token }) {
        const decoded = await this.jwtService.verify(token);
        if (!decoded) {
            return { status: common_1.HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
        }
        const auth = await this.jwtService.validateUser(decoded);
        if (!auth) {
            return { status: common_1.HttpStatus.CONFLICT, error: ['User not found'], userId: null };
        }
        return { status: common_1.HttpStatus.OK, error: null, userId: decoded.id };
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(auth_entity_1.Auth),
    __metadata("design:type", typeorm_2.Repository)
], AuthService.prototype, "repository", void 0);
__decorate([
    (0, common_1.Inject)(jwt_service_1.JwtService),
    __metadata("design:type", jwt_service_1.JwtService)
], AuthService.prototype, "jwtService", void 0);
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map