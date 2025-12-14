import { APIRequestContext } from '@playwright/test';
import {
    CreateProjectSensorRequest,
    CreateProjectSensorResponse,
    EditProjectSensorRequest,
    GetAllProjectsResponse,
    GetAllProjectsParams,
    CreateGroupSensorRequest,
    CreateGroupSensorResponse,
    EditGroupSensorRequest,
    GetAllGroupsResponse,
    GetAllGroupsParams,
    EditSensorRequest,
    EditSensorResponse
} from './bodySensorMonitoring';

export class ApiSensorMonitoring {
    private request: APIRequestContext;
    private baseUrl: string = '/api/projectnode/company-projects';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Create project sensor monitoring
     * @param companyId Company ID
     * @param token Authorization token (from cookie)
     * @param data Request body untuk create project
     * @returns CreateProjectSensorResponse
     */
    async createProject(
        companyId: string,
        token: string,
        data: CreateProjectSensorRequest
    ): Promise<CreateProjectSensorResponse> {
        try {
            const response = await this.request.post(`${this.baseUrl}/${companyId}/create`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                data: data
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Create project failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Create project error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Get project by ID
     * @param companyId Company ID
     * @param projectId Project ID
     * @param token Authorization token (from cookie)
     * @returns CreateProjectSensorResponse
     */
    async getProject(
        companyId: string,
        projectId: string,
        token: string
    ): Promise<CreateProjectSensorResponse> {
        try {
            const response = await this.request.get(`${this.baseUrl}/${companyId}/${projectId}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                }
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Get project failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Get project error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Edit project sensor monitoring
     * @param projectId Project ID (code)
     * @param token Authorization token (from cookie)
     * @param data Request body untuk edit project (name, description)
     * @returns CreateProjectSensorResponse
     */
    async editProject(
        projectId: string,
        token: string,
        data: EditProjectSensorRequest
    ): Promise<CreateProjectSensorResponse> {
        try {
            const response = await this.request.put(`/api/projectnode/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                data: data
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Edit project failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Edit project error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Get all projects sensor monitoring
     * @param token Authorization token (from cookie)
     * @param params Query parameters (page, limit, companyId, search)
     * @returns GetAllProjectsResponse
     */
    async getAllProjects(
        token: string,
        params: GetAllProjectsParams
    ): Promise<GetAllProjectsResponse> {
        try {
            const queryParams: Record<string, string> = {
                company_id: params.companyId
            };
            if (params.page !== undefined) queryParams.page = params.page.toString();
            if (params.limit !== undefined) queryParams.limit = params.limit.toString();
            if (params.search) queryParams.search = params.search;

            const response = await this.request.get('/api/projectnode/projects', {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                params: queryParams
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Get all projects failed',
                    page: 0,
                    count: 0,
                    total: 0,
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Get all projects error: ${(error as Error).message}`,
                page: 0,
                count: 0,
                total: 0,
                data: null
            };
        }
    }

    /**
     * Delete project sensor monitoring
     * @param projectId Project ID (code)
     * @param token Authorization token (from cookie)
     * @returns CreateProjectSensorResponse
     */
    async deleteProject(
        projectId: string,
        token: string
    ): Promise<CreateProjectSensorResponse> {
        try {
            const response = await this.request.delete(`/api/projectnode/projects/${projectId}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                }
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Delete project failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Delete project error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Create group sensor monitoring
     * @param projectId Project ID (code)
     * @param token Authorization token (from cookie)
     * @param data Request body untuk create group
     * @returns CreateGroupSensorResponse
     */
    async createGroup(
        projectId: string,
        token: string,
        data: CreateGroupSensorRequest
    ): Promise<CreateGroupSensorResponse> {
        try {
            const response = await this.request.post(`/api/projectnode/projects/${projectId}/groups`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                data: data
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Create group failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Create group error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Edit group sensor monitoring
     * @param projectId Project ID (code)
     * @param groupId Group ID
     * @param token Authorization token (from cookie)
     * @param data Request body untuk edit group (name, description)
     * @returns CreateGroupSensorResponse
     */
    async editGroup(
        projectId: string,
        groupId: string,
        token: string,
        data: EditGroupSensorRequest
    ): Promise<CreateGroupSensorResponse> {
        try {
            const response = await this.request.put(`/api/projectnode/projects/${projectId}/groups/${groupId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                data: data
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Edit group failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Edit group error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Get all groups in a project
     * @param projectId Project ID (code)
     * @param token Authorization token (from cookie)
     * @param params Query parameters (page, limit, search)
     * @returns GetAllGroupsResponse
     */
    async getAllGroups(
        projectId: string,
        token: string,
        params: GetAllGroupsParams = {}
    ): Promise<GetAllGroupsResponse> {
        try {
            const queryParams: Record<string, string> = {};
            if (params.page !== undefined) queryParams.page = params.page.toString();
            if (params.limit !== undefined) queryParams.limit = params.limit.toString();
            if (params.search) queryParams.search = params.search;

            const response = await this.request.get(`/api/projectnode/projects/${projectId}/groups`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                params: queryParams
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Get all groups failed',
                    page: 0,
                    count: 0,
                    total: 0,
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Get all groups error: ${(error as Error).message}`,
                page: 0,
                count: 0,
                total: 0,
                data: null
            };
        }
    }

    /**
     * Delete group sensor monitoring
     * @param projectId Project ID (code)
     * @param groupId Group ID
     * @param token Authorization token (from cookie)
     * @returns CreateGroupSensorResponse
     */
    async deleteGroup(
        projectId: string,
        groupId: string,
        token: string
    ): Promise<CreateGroupSensorResponse> {
        try {
            const response = await this.request.delete(`/api/projectnode/projects/${projectId}/groups/${groupId}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                }
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Delete group failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Delete group error: ${(error as Error).message}`,
                data: null
            };
        }
    }

    /**
     * Edit sensor in a node
     * @param nodeId Node ID
     * @param sensorId Sensor ID
     * @param token Authorization token (from cookie)
     * @param data Request body untuk edit sensor
     * @returns EditSensorResponse
     */
    async editSensor(
        nodeId: string,
        sensorId: string,
        token: string,
        data: EditSensorRequest
    ): Promise<EditSensorResponse> {
        try {
            const response = await this.request.put(`/api/projectnode/nodes/${nodeId}/sensors/${sensorId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    Cookie: `token=${token}`
                },
                data: data
            });

            try {
                return await response.json();
            } catch (error) {
                const text = await response.text();
                return {
                    code: response.status(),
                    status: response.ok(),
                    message: text || 'Edit sensor failed',
                    data: null
                };
            }
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: `Edit sensor error: ${(error as Error).message}`,
                data: null
            };
        }
    }
}
