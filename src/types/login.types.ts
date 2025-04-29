export interface LoginRequest {
    username: string;
    password: string;
}

interface Role {
    id: string;
    name: string;
    company_id: string | null;
    description: string;
    total_users: number;
    total_permissions: number;
}

interface License {
    key: string;
    package: string;
}

export interface UserData {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string[];
    avatar: string;
    status: string;
    created_at: string;
    updated_at: string;
    role: Role;
    project_role: Role[];
    firmware_user: string;
    firmware_password: string;
    projects: string[];
    telegram: string[];
    telegram_chat_ids: string[];
    notification_enabled: boolean;
    license: License;
}

export interface LoginResponse {
    code: number;
    status: boolean;
    message: string;
    data: UserData | string;
} 