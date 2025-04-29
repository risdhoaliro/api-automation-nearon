import { APIRequestContext } from '@playwright/test';
import { getClientToken, getAdminToken } from '@src/utils/token';
import { COMMON_HEADERS } from '@src/config/headers';

export class ProfileAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getProfileAll(token: string): Promise<any> {
        const headers = {
            ...COMMON_HEADERS,
            'Cookie': `token=${token}`
        };
        const response = await this.request.get('/api/users/profiles', { headers });
        return await response.json();
    }

    async getProfileAllByClient(): Promise<any> {
        return this.getProfileAll(getClientToken()!);
    }

    async getProfileAllByAdmin(): Promise<any> {
        return this.getProfileAll(getAdminToken()!);
    }
} 