import type { CoreRequest, CoreResponse } from "@intutable/core"
import type { RequestContext } from "lib/types"
import { historyStore } from "./store"
import type { GetHistoryResponse, HistoryRequest, RollbackRequest } from "./types"

/**
 * Fetches the history state from data-dan and updates the value in the `historyStore`.
 * @param requestContext Svelte Context for making request calls
 */
export async function refreshHistory(requestContext: RequestContext): Promise<void> {
    console.log("Refresh history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getHistoryState"
    }

    try {
        const history: GetHistoryResponse = await requestContext.send(coreRequest, {})
        historyStore.set(history)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Loads a history script in the data-dan plugin.
 * @param scriptName name of the script to be saved in the database
 * @param requestContext script
 */
export function loadHistory(
    scriptName: string,
    requestContext: RequestContext
): Promise<CoreResponse> {
    console.log("Load history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "loadHistoryFromDB"
    }

    const request: HistoryRequest = { scriptName }
    return requestContext.send(coreRequest, request)
}

/**
 * Saves a script of the current history in the data-dan plugin.
 * @param scriptName name of the saved script in the database
 * @param requestContext script
 */
export function saveHistory(
    scriptName: string,
    requestContext: RequestContext
): Promise<CoreResponse> {
    console.log("Save history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "saveHistoryToDB"
    }

    const request: HistoryRequest = { scriptName }
    return requestContext.send(coreRequest, request)
}

/**
 * Rolls back the changes of a code history until the index of `newHead`.
 * The index can be also bigger than the current index to redo the changes saved in the history.
 * @param newHead new index of the history to roll back to
 * @param requestContext script
 */
export function rollback(newHead: number, requestContext: RequestContext): Promise<CoreResponse> {
    console.log("Rollback history")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "rollback"
    }

    const request: RollbackRequest = { newHead }
    return requestContext.send(coreRequest, request)
}
