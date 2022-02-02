import type { CoreRequest, CoreResponse } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    GetDataFrameRequest,
    GetDataFrameResponse,
    GetHistoryResponse, HistoryRequest,
    RequestContext,
    RollbackRequest
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

export async function saveTable(
    tableName: string,
    context: RequestContext,
    varName: string = tableName
): Promise<ExecuteCodeResponse> {
    return executeCodeSnippet(
        `saveTable({ tableName: '${tableName}', varName: '${varName}' });`,
        context
    )
}

export async function executeCodeSnippet(
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

    return context.send(coreRequest, request) as ExecuteCodeResponse
}

export async function getDataFrame(
    tableName: string,
    context: RequestContext
): Promise<GetDataFrameResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getDataFrame"
    }

    const request: GetDataFrameRequest = {
        varName: tableName
    }

    return context.send(coreRequest, request) as GetDataFrameResponse
}

export async function getHistory(context: RequestContext): Promise<GetHistoryResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getHistoryState"
    }

    return context.send(coreRequest, {}) as GetHistoryResponse
}

export async function rollback(
    newHead: number,
    context: RequestContext
): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "rollback"
    }

    const request: RollbackRequest = { newHead }
    return context.send(coreRequest, request) as CoreResponse
}

export async function loadHistory(
    scriptName: string,
    context: RequestContext
): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "loadHistoryFromDB"
    }

    const request: HistoryRequest = { scriptName }
    return context.send(coreRequest, request) as CoreResponse
}

export async function saveHistory(
    scriptName: string,
    context: RequestContext
): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "saveHistoryToDB"
    }

    const request: HistoryRequest = { scriptName }
    return context.send(coreRequest, request) as CoreResponse
}
