import type { CoreRequest } from "@intutable/core"
import type {
    ExecuteCodeRequest,
    ExecuteCodeResponse,
    GetDataFrameRequest,
    RequestContext,
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
