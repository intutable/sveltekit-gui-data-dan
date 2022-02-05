import type { CoreRequest } from "@intutable/core"
import { executeCodeSnippet } from "./editor/fetch"
import type { ExecuteCodeResponse } from "./editor/types"
import type { GetDataFrameRequest, RequestContext, StoreContext } from "./types"

export async function refreshTableData(requestContext: RequestContext, storeContext: StoreContext) {
    console.log("Refresh table data")

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

async function loadTable(
    tableName: string,
    context: RequestContext,
    varName: string = tableName
): Promise<ExecuteCodeResponse> {
    console.log(`Load table "${tableName}"`)

    return executeCodeSnippet(
        `loadTable({ tableName: '${tableName}', varName: '${varName}' });`,
        context
    )
}
