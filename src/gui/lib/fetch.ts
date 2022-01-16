import type { CoreRequest, CoreResponse } from "@intutable/core"
import type { ExecuteCodeRequest, LoadTableRequest, RequestContext } from "./types"
import type { ExecuteCodeResponse } from "./types"

export async function loadTable(tableName: string, context: RequestContext): Promise<CoreResponse> {
    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "loadTable"
    }

    const request: LoadTableRequest = {
        table: tableName
    }

    return context.send(coreRequest, request)
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
