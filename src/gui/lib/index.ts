import EditorComponent from "./editor/EditorComponent.svelte"
import { executeCodeSnippet } from "./editor/fetch"
import { commitChanges, loadTable, refreshTableData, removeTable, initializeProjectData } from "./fetch"
import { refreshHistory } from "./history/fetch"
import HistoryComponent from "./history/HistoryComponent.svelte"
import type { RequestContext, StoreContext, TableListener } from "./types"

let requestContext: RequestContext
let storeContext: StoreContext

/**
 * Initializes the project data and refreshes all im-memory table data.
 * This method is called by the main GUI when plugin gets initialized.
 * @param projectId id of the current project
 * @param userId id of the current user
 * @param _requestContext Svelte Context for making request calls
 * @param _storeContext Svelte Context for accessing the tableStore
 */
async function onInit(
    projectId: number,
    userId: number,
    _requestContext: RequestContext,
    _storeContext: StoreContext
): Promise<void> {
    requestContext = _requestContext
    storeContext = _storeContext
    await initializeProjectData(projectId, userId, requestContext)
    await refreshTableData(requestContext, storeContext)
}

const tableListener: TableListener = {
    /**
     * Register callback when table data needs to be refreshed.
     */
    onRefresh: async () => {
        await refreshTableData(requestContext, storeContext)
        await refreshHistory(requestContext)
    },
    /**
     * Register callback when table needs to be loaded from the database by data-dan.
     * @param tableName name of the table to be loaded
     */
    onLoad: async (tableName) => {
        await loadTable(tableName, requestContext)
        await refreshHistory(requestContext)
    },
    /**
     * Register callback when a table in the database got deleted.
     * @param tableName name of the deleted table
     */
    onDelete: async (tableName) => {
        await removeTable(tableName, requestContext)
        await refreshHistory(requestContext)
    },
    /**
     * Register callback when cell of a table row in the database got updated.
     * @param tableName name of the updated table
     * @param rowIndex index of the row of the updated cell
     * @param columnIndex index of the column of the updated cell
     * @param newValue new value of the updated cell
     */
    onUpdate: async (tableName, rowIndex, columnIndex, newValue) => {
        const code = `${tableName}.values[${rowIndex}][${columnIndex + 1}] = "${newValue}";`
        await executeCodeSnippet(code, requestContext)
        await refreshHistory(requestContext)
    },
    /**
     * Register callback when in-memory table data should be persisted in the database.
     */
    onCommit: async () => {
        await commitChanges(requestContext)
        await refreshTableData(requestContext, storeContext)
        await refreshHistory(requestContext)
    }
}

export { EditorComponent, HistoryComponent, onInit, tableListener }
