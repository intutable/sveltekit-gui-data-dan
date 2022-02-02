<script lang="ts">
    import { getContext } from "svelte"
    import { executeCodeSnippet, getDataFrame } from "../fetch"
    import { historyStore } from "../store"
    import { RequestContext, StoreContext } from "../types"
    import type { TableContext } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    export let tableContext: TableContext

    async function sortColumn() {
        console.log(`Sort column '${tableContext.columnName}' of table '${tableContext.tableName}'`)

        try {
            const codeSnippet = `${tableContext.tableName} = ${tableContext.tableName}.sort_values({ by: '${tableContext.columnName}' });`
            await executeCodeSnippet(codeSnippet, requestContext)
            const rows = await getDataFrame(tableContext.tableName, requestContext)
            await storeContext.updateRows(tableContext.tableName, rows)
            historyStore.refresh()
        } catch (error: unknown) {
            console.log(`Sort column request failed with error: '${error.body?.error ?? error}'`)
        }
    }
</script>

<div on:click={sortColumn}>Sort column</div>

<style lang="sass">
</style>
