<script lang="ts">
    import { getContext } from "svelte"
    import { executeCodeSnippet } from "../fetch"
    import { Output, OutputType } from "../component/output/types"
    import { RequestContext, RequestError, StoreContext } from "../types"
    import type { TableContext } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    export let tableContext: TableContext

    async function sortColumn() {
        console.log(`Sort column '${tableContext.columnName}' of table '${tableContext.tableName}'`)

        try {
            const codeSnippet = `TABLE = TABLE.sort_values({ by: '${tableContext.columnName}' })`
            const response = await executeCodeSnippet(codeSnippet, requestContext)
            await storeContext.updateRows(`p1_${tableContext.tableName}`, response.data)
        } catch (error: RequestError) {
            console.log(`Sort column request failed with error: '${error.body.error}'`)
        }
    }
</script>

<div on:click={sortColumn}>Sort Column</div>

<style lang="sass">
</style>
