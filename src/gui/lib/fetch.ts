import type { CoreRequest } from "@intutable/core"
import { executeCodeSnippet } from "./editor/fetch"
import type {
    DataFrameNamesResponse,
    GetDataFrameRequest,
    RequestContext,
    StoreContext
} from "./types"

/**
 * Initialized the project data in the data-dan plugin.
 * Explicitly it sets the projectId and userId in the data-dan plugin.
 * @param projectId id of the current project
 * @param userId id of the current user
 * @param requestContext Svelte Context for making request calls
 */
export async function initializeProjectData(
    projectId: number,
    userId: number,
    requestContext: RequestContext
): Promise<void> {
    console.log("Initialize project data")

    try {
        await executeCodeSnippet(`setProjectId(${projectId})`, requestContext)
        await executeCodeSnippet(`setUserId(${userId})`, requestContext)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Refreshes the table data of the in-memory tables.
 * If a table is not yet in-memory, it will be loaded from the database.
 * @param requestContext Svelte Context for making request calls
 * @param storeContext Svelte Context for accessing the tableStore
 */
export async function refreshTableData(
    requestContext: RequestContext,
    storeContext: StoreContext
): Promise<void> {
    console.log("Refresh table data")

    try {
        let { dataFrameNames } = await getDataFrameNames(requestContext)
        const tableNames = storeContext.tableNames()
        // Union of the tables that are in the database and the tables that are in-memory
        const union = Array.from(new Set([...dataFrameNames, ...tableNames]))

        for (const tableName of union) {
            if (!dataFrameNames.includes(tableName)) {
                // Load tables that are not yet in-memory
                await loadTable(tableName, requestContext)
            }

            await getTableData(tableName, requestContext, storeContext)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * Loads a table from the database and stores it in a dataframe with the name of `tableName`.
 * @param tableName name of the table to be loaded
 * @param requestContext Svelte Context for making request calls
 */
export async function loadTable(
    tableName: string,
    requestContext: RequestContext
): Promise<void> {
    console.log(`Load table "${tableName}"`)

    try {
        await executeCodeSnippet(
            `var ${tableName} = await loadTable("${tableName}");`,
            requestContext
        )
    } catch (error) {
        console.log(error)
    }
}

/**
 * Removes the dataframe of a table in the data-dan plugin.
 * @param tableName name of the table to be removed
 * @param requestContext Svelte Context for making request calls
 */
export async function removeTable(
    tableName: string,
    requestContext: RequestContext
): Promise<void> {
    console.log(`Remove table "${tableName}"`)

    try {
        await executeCodeSnippet(`${tableName} = undefined;`, requestContext)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Persists the changes made on the in-memory changes in the database.
 * @param requestContext Svelte Context for making request calls
 */
export async function commitChanges(requestContext: RequestContext): Promise<void> {
    try {
        let { dataFrameNames } = await getDataFrameNames(requestContext)

        for (const tableName of dataFrameNames) {
            const snippet = `await saveTable(${tableName}, "${tableName}", undefined)`
            await executeCodeSnippet(snippet, requestContext)
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * Returns the dataframe names that are currently loaded in the data-dan plugin.
 * @param requestContext Svelte Context for making request calls
 * @returns an object containing the names of the in-memory dataframes
 */
function getDataFrameNames(requestContext: RequestContext): Promise<DataFrameNamesResponse> {
    console.log("Get dataframe names")

    const coreRequest: CoreRequest = {
        channel: "data-dan",
        method: "getDataFrameNames"
    }

    return requestContext.send(coreRequest, {}) as Promise<DataFrameNamesResponse>
}

/**
 * Returns the table data of a dataframe in the data-dan plugin.
 * @param tableName name of the table to get the table data
 * @param requestContext Svelte Context for making request calls
 * @param storeContext Svelte Context for accessing the tableStore
 */
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
