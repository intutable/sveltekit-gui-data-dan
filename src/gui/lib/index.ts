import EditorComponent from "./editor/EditorComponent.svelte"
import { executeCodeSnippet } from "./editor/fetch"
import { loadTable, refreshTableData, removeTable } from "./fetch"
import { refreshHistory } from "./history/fetch"
import HistoryComponent from "./history/HistoryComponent.svelte"
import type { RequestContext, StoreContext, TableListener } from "./types"

async function onInit(requestContext: RequestContext, storeContext: StoreContext): Promise<void> {
    await refreshTableData(requestContext, storeContext)
}

const tableListener: TableListener = {
    onRefresh: async (requestContext, storeContext) => {
        await refreshTableData(requestContext, storeContext)
        await refreshHistory(requestContext)
    },
    onLoad: async (tableName, requestContext) => {
        await loadTable(`p1_${tableName}`, requestContext)
        await refreshHistory(requestContext)
    },
    onDelete: async (tableName, requestContext) => {
        await removeTable(`p1_${tableName}`, requestContext)
        await refreshHistory(requestContext)
    },
    onUpdate: async (
        tableName,
        rowIndex,
        columnIndex,
        newValue,
        requestContext
    ) => {
        const code = `p1_${tableName}.values[${rowIndex}][${columnIndex + 1}] = "${newValue}";`
        await executeCodeSnippet(code, requestContext)
    }
}

export { EditorComponent, HistoryComponent, onInit, tableListener }
