import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => Promise<CoreResponse>
}

export interface StoreContext {
    tableNames: () => string[]
    refresh: (tableName: string) => void
    updateRows: (tableName: string, rows: object[]) => void
}

export interface ExecuteCodeRequest {
    code: string
}

export interface GetDataFrameRequest {
    varName: string
}

export interface HistoryRequest {
    scriptName: string
}

export interface RollbackRequest {
    newHead: number
}

export interface ExecuteCodeResponse extends CoreResponse {
    output: string
}

export interface GetHistoryResponse extends CoreResponse, History {}

export interface History {
    snippets: string[]
    head: number
}
