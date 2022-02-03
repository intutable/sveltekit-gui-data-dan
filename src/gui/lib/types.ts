import type { CoreRequest, CoreResponse } from "@intutable/core"
import type { Writable } from "svelte/store"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => Promise<CoreResponse>
}

export interface StoreContext {
    eventStore: () => Writable<string[]>
    tableNames: () => string[]
    updateRows: (tableName: string, rows: object[]) => void
}

export interface ExecuteCodeRequest {
    code: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    output: string
}

export interface GetDataFrameRequest {
    varName: string
}
