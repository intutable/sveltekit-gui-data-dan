import type { CoreRequest, CoreResponse } from "@intutable/core"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => Promise<CoreResponse>
}

export interface StoreContext {
    tableNames: () => string[]
    updateTable: (tableData: object) => void
}

export interface GetDataFrameRequest {
    varName: string
}

export interface DataFrameNamesResponse extends CoreResponse {
    dataFrameNames: string[]
}

export interface TableListener {
    onRefresh: (requestContext: RequestContext, storeContext: StoreContext) => void | Promise<void>,
    onLoad: (tableName: string, requestContext: RequestContext) => void | Promise<void>,
    onDelete: (tableName: string, requestContext: RequestContext) => void | Promise<void>,
}
