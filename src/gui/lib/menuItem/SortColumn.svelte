<script lang="ts">
    import { getContext } from "svelte"
    import { executeCodeSnippet } from "../fetch"
    import { Output, OutputType } from "../component/output/types"
    import { RequestContext, RequestError, StoreContext } from "../types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")
    const TABLE_NAME = "p1_newTableName"

    async function sortColumn() {
        try {
            const codeSnippet = "TABLE = TABLE.sort_values({ by: 'newColumnName' })"
            const response = await executeCodeSnippet(codeSnippet, requestContext)

            const message = response.message.charAt(0).toUpperCase() + response.message.slice(1)
            const output = new Output(OutputType.Info, message)
            console.log(output)

            await storeContext.updateRows(TABLE_NAME, response.data)
        } catch (error: RequestError) {
            console.log(error)
        }
    }
</script>

<div on:click={sortColumn}>Sort Column</div>

<style lang="sass">
</style>
