import type { CoreRequest } from "@intutable/core"
import type { ExecuteCodeRequest, ExecuteCodeResponse, RequestContext } from "./types"

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
