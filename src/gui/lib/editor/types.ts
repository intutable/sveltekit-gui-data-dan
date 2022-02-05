import type { CoreResponse } from "@intutable/core"

export interface ExecuteCodeRequest {
    code: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    output: string
}
