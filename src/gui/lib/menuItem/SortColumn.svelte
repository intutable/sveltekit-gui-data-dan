<script lang="ts">
    import { getContext } from "svelte"
    import { executeCodeSnippet, loadTable, saveTable } from "../fetch"
    import { RequestContext, StoreContext } from "../types"
    import type { TableContext } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    export let tableContext: TableContext

    async function sortColumn() {
        console.log(`Sort column '${tableContext.columnName}' of table '${tableContext.tableName}'`)
        const varName = `sort_${tableContext.tableName}`

        try {
            await loadTable(tableContext.tableName, requestContext, varName)

            const codeSnippet = `${varName} = ${varName}.sort_values({ by: '${tableContext.columnName}' });`
            await executeCodeSnippet(codeSnippet, requestContext)

            await saveTable(tableContext.tableName, requestContext, varName)
            storeContext.refresh(tableContext.tableName)
        } catch (error: unknown) {
            console.log(`Sort column request failed with error: '${error.body?.error ?? error}'`)
        }
    }
</script>

<div on:click={sortColumn}>Sort Column</div>

<style lang="sass">
</style>
