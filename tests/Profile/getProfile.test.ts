import { test, expect } from '@playwright/test';
import { ProfileAPI } from '@src/api/Profile/profile.api';
import { suiteLoginSetup } from '../../src/api/Login/suite.login.api';
import { getClientToken, getAdminToken } from '@src/utils/token';
import { ENV } from '@src/config/data';

test.describe('Profile API', () => {
    let profileApi: ProfileAPI;

    test.beforeAll(async () => {
        await suiteLoginSetup();
    });

    test.beforeEach(async ({ request }) => {
        profileApi = new ProfileAPI(request);
    });

    test('Client: Should successfully get profile data as Client', async () => {
        await test.step('Request profile data using client token', async () => {
            const response = await profileApi.getProfileAll(getClientToken()!);
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(200);
            expect(response.status).toBe(true);
            expect(response.message).toBe('success');
            expect(response.data).toBeDefined();
            expect(response.data.id).toBeDefined();
            expect(response.data.name).toBeDefined();
            expect(response.data.username).toBeDefined();
            expect(response.data.email).toBeDefined();
            expect(response.data.status).toBe(ENV.STATUS.ACTIVE);
            expect(response.data.role).toBeDefined();
            expect(response.data.role.id).toBeDefined();
            expect(response.data.role.name).toBeDefined();
            expect(Array.isArray(response.data.projects)).toBe(true);
            expect(response.data.projects).toContain(ENV.PROJECTS.DEFAULT);
            expect(response.data.role.name).toBe(ENV.ROLES.CLIENT);
        });
    });

    test('Admin: Should successfully get profile data as Admin', async () => {
        await test.step('Request profile data using admin token', async () => {
            const response = await profileApi.getProfileAll(getAdminToken()!);
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(200);
            expect(response.status).toBe(true);
            expect(response.message).toBe('success');
            expect(response.data).toBeDefined();
            expect(response.data.id).toBeDefined();
            expect(response.data.name).toBeDefined();
            expect(response.data.username).toBeDefined();
            expect(response.data.email).toBeDefined();
            expect(response.data.status).toBe(ENV.STATUS.ACTIVE);
            expect(response.data.role).toBeDefined();
            expect(response.data.role.id).toBeDefined();
            expect(response.data.role.name).toBeDefined();
            expect(Array.isArray(response.data.projects)).toBe(true);
            expect(response.data.role.name).toBe(ENV.ROLES.ADMIN);
        });
    });
});
