import { request as playwrightRequest } from '@playwright/test';
import { ENV } from '@src/config/data';
import { setClientToken, setAdminToken, getClientToken, getAdminToken } from '@src/utils/token';

export async function suiteLoginSetup() {
    // Setup client token
    if (!getClientToken()) {
        const reqContext = await playwrightRequest.newContext();
        const loginResp = await reqContext.post(`${ENV.BASE_URL}/api/auth/login`, {
            data: ENV.CREDENTIALS.VALID_USER
        });
        const storage = await reqContext.storageState();
        const tokenCookie = storage.cookies.find(c => c.name === 'token');
        setClientToken(tokenCookie?.value);
        // console.log('Token dari suiteLoginSetup:', tokenCookie?.value);
        await reqContext.dispose();
    }
    // Setup admin token
    if (!getAdminToken()) {
        const reqContext = await playwrightRequest.newContext();
        const loginResp = await reqContext.post(`${ENV.BASE_URL}/api/auth/login`, {
            data: ENV.CREDENTIALS.VALID_ADMIN
        });
        const storage = await reqContext.storageState();
        const tokenCookie = storage.cookies.find(c => c.name === 'token');
        setAdminToken(tokenCookie?.value);
        await reqContext.dispose();
    }
}
