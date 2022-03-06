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
    onRefresh: () => void | Promise<void>,
    onLoad: (tableName: string) => void | Promise<void>,
    onDelete: (tableName: string) => void | Promise<void>,
    onUpdate: (
        tableName: string,
        rowIndex: number,
        columnIndex: number,
        newValue: string
    ) => void | Promise<void>,
    onCommit: () => void | Promise<void>
}
