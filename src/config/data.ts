export const ENV = {
    BASE_URL: 'https://dev-nearon.synapsis.id',
    CREDENTIALS: {
        VALID_USER: {
            username: 'mitrajaya',
            password: 'password'
        },
        NONEXISTENT_USER: {
            username: 'useryangtidakada',
            password: 'password123'
        },
        WRONG_PASSWORD: {
            username: 'mitrajaya',
            password: 'passwordsalah'
        },
        VALID_ADMIN: {
            username: 'admin',
            password: 'admin123'
        },
        NONEXISTENT_ADMIN: {
            username: 'adminyangtidakada',
            password: 'password123'
        },
        WRONG_PASSWORD_ADMIN: {
            username: 'admin',
            password: 'passwordsalahadmin'
        }
    },
    ROLES: {
        CLIENT: 'Customer',
        ADMIN: 'Administrator'
    },
    PROJECTS: {
        DEFAULT: 'MITRA'
    },
    STATUS: {
        ACTIVE: 'active'
    }
}; 