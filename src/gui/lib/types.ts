import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => Promise<CoreResponse>
}

export interface StoreContext {
    tableNames: () => string[]
    updateRows: (tableName: string, rows: object[]) => void
}

export interface GetDataFrameRequest {
    varName: string
}

export interface DataFrameNamesResponse extends CoreResponse {
    dataFrameNames: string[]
}
