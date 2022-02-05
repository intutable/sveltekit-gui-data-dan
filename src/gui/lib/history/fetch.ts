import type { CoreRequest, CoreResponse } from "@intutable/core"
import type { RequestContext } from "lib/types"
import { historyStore } from "./store"
import type { HistoryRequest, RollbackRequest } from "./types"

export async function refreshHistory(context: RequestContext): Promise<void> {
    console.log("Refresh history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getHistoryState"
    }

    try {
        const history = await context.send(coreRequest, {})
        historyStore.set(history)
    } catch (error) {
        console.error(error)
    }
}

export function loadHistory(scriptName: string, context: RequestContext): Promise<CoreResponse> {
    console.log("Load history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "loadHistoryFromDB"
    }

    const request: HistoryRequest = { scriptName }
    return context.send(coreRequest, request)
}

export function saveHistory(scriptName: string, context: RequestContext): Promise<CoreResponse> {
    console.log("Save history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "saveHistoryToDB"
    }

    const request: HistoryRequest = { scriptName }
    return context.send(coreRequest, request)
}

export function rollback(newHead: number, context: RequestContext): Promise<CoreResponse> {
    console.log("Rollback history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "rollback"
    }

    const request: RollbackRequest = { newHead }
    return context.send(coreRequest, request)
}
