import type { CoreRequest } from "@intutable/core"
import type { RequestContext } from "../types"
import type { ExecuteCodeRequest, ExecuteCodeResponse } from "./types"

export function executeCodeSnippet(
    codeSnippet: string,
    context: RequestContext
): Promise<ExecuteCodeResponse> {
    console.log(`Execute code snippet "${codeSnippet}"`)

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "execute"
    }

    const request: ExecuteCodeRequest = {
        code: codeSnippet
    }

    return context.send(coreRequest, request) as Promise<ExecuteCodeResponse>
}
