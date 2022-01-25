import type { CoreRequest } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    GetDataFrameRequest,
    GetDataFrameResponse,
    RequestContext
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
