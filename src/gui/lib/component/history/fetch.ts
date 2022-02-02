import type { CoreRequest, CoreResponse } from "@intutable/core"
import type { RequestContext } from "lib/types"
import type { GetHistoryResponse, HistoryRequest, RollbackRequest } from "./types"

export function getHistory(context: RequestContext): Promise<GetHistoryResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getHistoryState"
    }

    return context.send(coreRequest, {}) as Promise<GetHistoryResponse>
}

export function loadHistory(
    scriptName: string,
    context: RequestContext
): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "loadHistoryFromDB"
    }

    const request: HistoryRequest = { scriptName }
    return context.send(coreRequest, request) as Promise<CoreResponse>
}

export function saveHistory(
    scriptName: string,
    context: RequestContext
): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "saveHistoryToDB"
    }

    const request: HistoryRequest = { scriptName }
    return context.send(coreRequest, request) as Promise<CoreResponse>
}

export function rollback(
    newHead: number,
    context: RequestContext
): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "rollback"
    }

    const request: RollbackRequest = { newHead }
    return context.send(coreRequest, request) as Promise<CoreResponse>
}
