import type { CoreRequest } from "@intutable/core"
import { executeCodeSnippet } from "./editor/fetch"
import type {
    DataFrameNamesResponse,
    GetDataFrameRequest,
    RequestContext,
    StoreContext
} from "./types"

export async function refreshTableData(requestContext: RequestContext, storeContext: StoreContext) {
    console.log("Refresh table data")

    try {
        let { dataFrameNames } = await getDataFrameNames(requestContext)
        const tableNames = storeContext.tableNames().map(name => `p1_${name}`)
        const union = Array.from(new Set([...dataFrameNames, ...tableNames]))

        for (const tableName of union) {
            if (!dataFrameNames.includes(tableName)) {
                await loadTable(tableName, requestContext)
            }

            await getTableData(tableName, requestContext, storeContext)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function loadTable(
    tableName: string,
    context: RequestContext
): Promise<void> {
    console.log(`Load table "${tableName}"`)

    try {
        await executeCodeSnippet(`var ${tableName} = await loadTable("${tableName}");`, context)
    } catch (error) {
        console.log(error)
    }
}

export async function removeTable(
    tableName: string,
    context: RequestContext
): Promise<void> {
    console.log(`Remove table "${tableName}"`)

    try {
        await executeCodeSnippet(`${tableName} = undefined;`, context)
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

    const tableData = await requestContext.send(coreRequest, request)
    await storeContext.updateTable(tableData)
}
