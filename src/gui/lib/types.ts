import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => CoreResponse
}

export interface StoreContext {
    updateRows: (tableName: string, rows: object[]) => CoreResponse
}

export interface ExecuteCodeRequest {
    code: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    message: string
    output: string
    data: object[]
}

export interface RequestError extends Error {
    body: object
}
