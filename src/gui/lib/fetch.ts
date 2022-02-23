import type { CoreRequest } from "@intutable/core"
import { executeCodeSnippet } from "./editor/fetch"
import { ExecuteCodeRequest } from "./editor/types"
import type { ExecuteCodeResponse } from "./editor/types"
import type {
    DataFrameNamesResponse,
    GetDataFrameRequest,
    RequestContext,
    StoreContext
} from "./types"

export async function refreshTableData(requestContext: RequestContext, storeContext: StoreContext) {
    console.log("Refresh table data")

    const { dataFrameNames } = await getDataFrameNames(requestContext)
    const tableNames = storeContext.tableNames()

    try {
        for (const tableName of tableNames) {
            if (!dataFrameNames.includes(tableName)) {
                await loadTable(tableName, requestContext)
            }

            await getTableData(tableName, requestContext, storeContext)
        }
    } catch (error) {
        console.log(error)
    }
}

function getDataFrameNames(context: RequestContext): Promise<DataFrameNamesResponse> {
    console.log("Get dataframe names")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getDataFrameNames"
    }

    return context.send(coreRequest, {}) as Promise<DataFrameNamesResponse>
}

async function getTableData(
    tableName: string,
    requestContext: RequestContext,
    storeContext: StoreContext
) {
    console.log(`Get table data of "${tableName}"`)

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
        `var ${varName} = await loadTable("${tableName}")`,
        context
    )
}
