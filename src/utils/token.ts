let clientToken: string | undefined;
let adminToken: string | undefined;

export function setClientToken(val: string | undefined) {
    clientToken = val;
}

export function getClientToken(): string | undefined {
    return clientToken;
}

export function setAdminToken(val: string | undefined) {
    adminToken = val;
}

export function getAdminToken(): string | undefined {
    return adminToken;
} 