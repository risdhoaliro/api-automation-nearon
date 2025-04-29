import { APIRequestContext } from '@playwright/test';
import { LoginRequest, LoginResponse } from '../../types/login.types';
import { COMMON_HEADERS } from '../../config/headers';
import { ENV } from '../../config/data';

export class LoginAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await this.request.post('/api/auth/login', {
            data: data,
            headers: COMMON_HEADERS
        });

        return await response.json();
    }

    async loginAsClient(): Promise<LoginResponse> {
        return this.login(ENV.CREDENTIALS.VALID_USER);
    }

    async loginAsAdmin(): Promise<LoginResponse> {
        return this.login(ENV.CREDENTIALS.VALID_ADMIN);
    }
} 