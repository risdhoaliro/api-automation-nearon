import { test, expect } from '@playwright/test';
import { LoginAPI } from '@src/api/Login/login.api';
import { ENV } from '@src/config/data';
import { UserData } from '@src/types/login.types';
import { API_MESSAGES, API_RESPONSE_CODES } from '@src/data/api.data';
import { setClientToken, getClientToken, setAdminToken, getAdminToken } from '@src/utils/token';

function isUserData(data: any): data is UserData {
    return (
        typeof data === 'object' &&
        'username' in data &&
        'id' in data &&
        'role' in data &&
        'projects' in data
    );
}

test.describe('Login API', () => {
    let loginApi: LoginAPI;

    test.beforeEach(async ({ request }) => {
        loginApi = new LoginAPI(request);
    });

    test('Client: Should successfully login with valid credentials', async ({ request }) => {
        await test.step('Login as client with valid credentials', async () => {
            const response = await loginApi.loginAsClient();
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(API_RESPONSE_CODES.SUCCESS);
            expect(response.status).toBe(true);
            expect(response.message).toBe(API_MESSAGES.LOGIN.SUCCESS);
            expect(response.data).toBeDefined();
            expect(isUserData(response.data)).toBe(true);
            if (isUserData(response.data)) {
                expect(response.data.username).toBe(ENV.CREDENTIALS.VALID_USER.username);
                expect(response.data.id).toBeDefined();
                expect(response.data.role).toBeDefined();
                expect(response.data.projects).toContain(ENV.PROJECTS.DEFAULT);
                expect(response.data.status).toBe(ENV.STATUS.ACTIVE);
                expect(response.data.role.name).toBe(ENV.ROLES.CLIENT);
                console.log('User data from client login:', {
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role,
                    projects: response.data.projects
                });
            } else {
                throw new Error('Response data is not in UserData format');
            }
            const storage = await request.storageState();
            const tokenCookie = storage.cookies.find(c => c.name === 'token');
            setClientToken(tokenCookie?.value);
            expect(getClientToken()).toBeDefined();
        });
    });

    test('Client: Should fail login when user does not exist', async () => {
        await test.step('Login with non-existent username', async () => {
            const response = await loginApi.login(ENV.CREDENTIALS.NONEXISTENT_USER);
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(API_RESPONSE_CODES.NOT_FOUND);
            expect(response.status).toBe(false);
            expect(response.message).toBe(API_MESSAGES.LOGIN.USER_NOT_FOUND);
            expect(response.data).toBe(API_MESSAGES.LOGIN.USER_NOT_FOUND);
        });
    });

    test('Client: Should fail login with incorrect password', async () => {
        await test.step('Login with incorrect password', async () => {
            const response = await loginApi.login(ENV.CREDENTIALS.WRONG_PASSWORD);
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(API_RESPONSE_CODES.BAD_REQUEST);
            expect(response.status).toBe(false);
            expect(response.message).toBe(API_MESSAGES.LOGIN.PASSWORD_INCORRECT);
            expect(response.data).toBe(API_MESSAGES.LOGIN.PASSWORD_INCORRECT);
        });
    });

    test('Admin: Should successfully login with valid credentials', async ({ request }) => {
        await test.step('Login as admin with valid credentials', async () => {
            const response = await loginApi.loginAsAdmin();
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(API_RESPONSE_CODES.SUCCESS);
            expect(response.status).toBe(true);
            expect(response.message).toBe(API_MESSAGES.LOGIN.SUCCESS);
            expect(response.data).toBeDefined();
            expect(isUserData(response.data)).toBe(true);
            if (isUserData(response.data)) {
                expect(response.data.username).toBe(ENV.CREDENTIALS.VALID_ADMIN.username);
                expect(response.data.id).toBeDefined();
                expect(response.data.role).toBeDefined();
                expect(response.data.status).toBe(ENV.STATUS.ACTIVE);
                expect(response.data.role.name).toBe(ENV.ROLES.ADMIN);
                console.log('User data from admin login:', {
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.role,
                    projects: response.data.projects
                });
            } else {
                throw new Error('Response data is not in UserData format');
            }
            const storage = await request.storageState();
            const tokenCookie = storage.cookies.find(c => c.name === 'token');
            setAdminToken(tokenCookie?.value);
            expect(getAdminToken()).toBeDefined();
            console.log('Admin token:', getAdminToken());
        });
    });

    test('Admin: Should fail login when user does not exist', async () => {
        await test.step('Login as admin with non-existent username', async () => {
            const response = await loginApi.login(ENV.CREDENTIALS.NONEXISTENT_ADMIN);
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(API_RESPONSE_CODES.NOT_FOUND);
            expect(response.status).toBe(false);
            expect(response.message).toBe(API_MESSAGES.LOGIN.USER_NOT_FOUND);
            expect(response.data).toBe(API_MESSAGES.LOGIN.USER_NOT_FOUND);
        });
    });

    test('Admin: Should fail login with incorrect password', async () => {
        await test.step('Login as admin with incorrect password', async () => {
            const response = await loginApi.login(ENV.CREDENTIALS.WRONG_PASSWORD_ADMIN);
            await test.info().attach('Response Body', {
                body: JSON.stringify(response, null, 2),
                contentType: 'application/json',
            });
            expect(response.code).toBe(API_RESPONSE_CODES.BAD_REQUEST);
            expect(response.status).toBe(false);
            expect(response.message).toBe(API_MESSAGES.LOGIN.PASSWORD_INCORRECT);
            expect(response.data).toBe(API_MESSAGES.LOGIN.PASSWORD_INCORRECT);
        });
    });
}); 