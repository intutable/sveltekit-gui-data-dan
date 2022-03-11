import type { CoreRequest } from "@intutable/core"
import type { RequestContext } from "../types"
import type { ExecuteCodeRequest, ExecuteCodeResponse } from "./types"

/**
 * Executes a code snippet in the data-dan plugin.
 * @param codeSnippet code snippet to be executed
 * @param requestContext Svelte Context for making request calls
 * @returns The console argument entries of the executed code
 */
export function executeCodeSnippet(
    codeSnippet: string,
    requestContext: RequestContext
): Promise<ExecuteCodeResponse> {
    console.log(`Execute code snippet "${codeSnippet}"`)

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "execute"
    }

    const request: ExecuteCodeRequest = {
        code: codeSnippet
    }

    return requestContext.send(coreRequest, request) as Promise<ExecuteCodeResponse>
}
