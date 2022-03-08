import EditorComponent from "./editor/EditorComponent.svelte"
import { executeCodeSnippet } from "./editor/fetch"
import { commitChanges, loadTable, refreshTableData, removeTable, initializeProjectData } from "./fetch"
import { refreshHistory } from "./history/fetch"
import HistoryComponent from "./history/HistoryComponent.svelte"
import type { RequestContext, StoreContext, TableListener } from "./types"

let requestContext: RequestContext
let storeContext: StoreContext

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
    onRefresh: async () => {
        await refreshTableData(requestContext, storeContext)
        await refreshHistory(requestContext)
    },
    onLoad: async (tableName) => {
        await loadTable(tableName, requestContext)
        await refreshHistory(requestContext)
    },
    onDelete: async (tableName) => {
        await removeTable(tableName, requestContext)
        await refreshHistory(requestContext)
    },
    onUpdate: async (tableName, rowIndex, columnIndex, newValue) => {
        const code = `${tableName}.values[${rowIndex}][${columnIndex + 1}] = "${newValue}";`
        await executeCodeSnippet(code, requestContext)
        await refreshHistory(requestContext)
    },
    onCommit: async () => {
        await commitChanges(requestContext)
        await refreshTableData(requestContext, storeContext)
        await refreshHistory(requestContext)
    }
}

export { EditorComponent, HistoryComponent, onInit, tableListener }
