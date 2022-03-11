import type { CoreResponse } from "@intutable/core"

export interface ExecuteCodeRequest {
    code: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    consoleArgEntries: {
        log: string[][]
        debug: string[][]
        info: string[][]
        warn: string[][]
        error: string[][]
    }
}
