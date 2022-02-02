import type { CoreRequest, CoreResponse } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    GetDataFrameRequest,
    GetHistoryResponse,
    HistoryRequest,
    RequestContext,
    RollbackRequest,
    StoreContext
} from "./types"

export async function loadTable(
    tableName: string,
    context: RequestContext,
    varName: string = tableName
): Promise<ExecuteCodeResponse> {
    return executeCodeSnippet(
        `loadTable({ tableName: '${tableName}', varName: '${varName}' });`,
        context
    )
}

export function executeCodeSnippet(
    codeSnippet: string,
    context: RequestContext
): Promise<ExecuteCodeResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "execute"
    }

    const request: ExecuteCodeRequest = {
        code: codeSnippet
    }

    return context.send(coreRequest, request) as Promise<ExecuteCodeResponse>
}

export async function refreshTableData(
    requestContext: RequestContext,
    storeContext: StoreContext
) {
    for (const tableName of storeContext.tableNames()) {
        try {
            await getTableData(tableName, requestContext, storeContext)
        } catch {
            try {
                await loadTable(tableName, requestContext)
                await getTableData(tableName, requestContext, storeContext)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

async function getTableData(
    tableName: string,
    requestContext: RequestContext,
    storeContext: StoreContext
) {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getDataFrame"
    }

    const request: GetDataFrameRequest = {
        varName: tableName
    }

    const rows = await requestContext.send(coreRequest, request)
    await storeContext.updateRows(tableName, rows)
}

export function getHistory(context: RequestContext): Promise<GetHistoryResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getHistoryState"
    }

    return context.send(coreRequest, {}) as Promise<GetHistoryResponse>
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
