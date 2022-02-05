import type { CoreResponse } from "@intutable/core"

export interface HistoryRequest {
    scriptName: string
}

export interface GetHistoryResponse extends CoreResponse, History {}

export interface History {
    snippets: string[]
    head: number
}

export interface RollbackRequest {
    newHead: number
}
