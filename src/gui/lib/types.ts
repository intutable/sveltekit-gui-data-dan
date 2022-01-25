import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => CoreResponse
}

export interface StoreContext {
    refresh: (tableName: string) => CoreResponse
    updateRows: (tableName: string, rows: object[]) => CoreResponse
}

export interface ExecuteCodeRequest {
    code: string
}

export interface GetDataFrameRequest {
    varName: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    output: string
}

export interface GetDataFrameResponse extends CoreResponse {
    data: object[]
}
