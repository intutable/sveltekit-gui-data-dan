import EditorComponent from "./editor/EditorComponent.svelte"
import { refreshTableData } from "./fetch"
import { refreshHistory } from "./history/fetch"
import HistoryComponent from "./history/HistoryComponent.svelte"
import type { RequestContext, StoreContext } from "./types"

async function onInit(requestContext: RequestContext, storeContext: StoreContext): Promise<void> {
    await refreshTableData(requestContext, storeContext)
}

async function onTableDataChanged(
    requestContext: RequestContext,
    storeContext: StoreContext
): Promise<void> {
    await refreshTableData(requestContext, storeContext)
    await refreshHistory(requestContext)
}

export { EditorComponent, HistoryComponent, onInit, onTableDataChanged }
