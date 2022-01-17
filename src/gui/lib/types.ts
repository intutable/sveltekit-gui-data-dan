import type { CoreRequest, CoreResponse } from "@intutable/core"
import type { SvelteComponent } from "svelte"

export interface RequestContext {
    send: (request: CoreRequest, body: object) => CoreResponse
}

export interface StoreContext {
    updateRows: (tableName: string, rows: object[]) => CoreResponse
}

export interface CommonUiContext {
    getLoadingIndicator: () => SvelteComponent
    getOutputPanel: () => SvelteComponent
}

export interface ExecuteCodeRequest {
    code: string
}

export interface ExecuteCodeResponse extends CoreResponse {
    message: string
    output: string
    data: object[]
}

export interface RequestError extends Error {
    body: object
}

export class Output {
    constructor(public type: OutputType, public message: string) {}
}

export enum OutputType {
    Info = "Info",
    Error = "Error"
}

