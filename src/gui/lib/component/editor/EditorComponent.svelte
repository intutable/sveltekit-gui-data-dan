<script lang="ts">
    import { getContext, onMount } from "svelte"
    import { executeCodeSnippet, getDataFrame, loadTable } from "../../fetch"
    import { historyStore } from "../../store"
    import { RequestContext, StoreContext } from "../../types"
    import LoadingIndicator from "../loadingIndicator/LoadingIndicator.svelte"
    import OutputPanel from "../output/OutputPanel.svelte"
    import { Output, OutputType } from "../output/types"
    import CodeEditor from "./CodeEditor.svelte"
    import RunBar from "./RunBar.svelte"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    let codeSnippet: string
    let output: Output | undefined
    let showLoadingIndicator = false
    let showOutput = false

    onMount(async () => {
        for (const tableName of storeContext.tableNames()) {
            try {
                const rows = await getDataFrame(tableName, requestContext)
                await storeContext.updateRows(tableName, rows)
            } catch {
                await loadTable(tableName, requestContext)
                const rows = await getDataFrame(tableName, requestContext)
                await storeContext.updateRows(tableName, rows)
            }
        }
        historyStore.refresh()
    })

    async function onRun(): Promise<void> {
        console.log(`Execute code snippet "${codeSnippet}"`)
        showLoadingIndicator = true

        try {
            await executeCodeSnippet(codeSnippet, requestContext)
        } catch (error) {
            onError(error)
            return
        }

        historyStore.refresh()
        output = new Output(OutputType.Info, "Successfully executed code")
        showLoadingIndicator = false
        showOutput = true

        await getTableData()
    }

    async function getTableData() {
        for (const tableName of storeContext.tableNames()) {
            const rows = await getDataFrame(tableName, requestContext)
            await storeContext.updateRows(tableName, rows)
        }
    }

    function onError(error: unknown): void {
        console.error(error)
        output = new Output(OutputType.Error, error.body?.error ?? `${error}`)
        showLoadingIndicator = false
        showOutput = true
    }
</script>

<div class="main-container">
    <RunBar bind:showOutput={showOutput} on:run={onRun} />
    {#if showLoadingIndicator}
        <LoadingIndicator />
    {:else if showOutput}
        <OutputPanel {output} />
    {:else}
        <CodeEditor bind:codeSnippet={codeSnippet} />
    {/if}
</div>

<style lang="sass">
  @use "../../../../../node_modules/@intutable/common-gui/dist/style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1
    overflow-x: hidden
</style>
