<script lang="ts">
    import { getContext, onMount } from "svelte"
    import { executeCodeSnippet, getDataFrame, loadTable } from '../../fetch'
    import { RequestContext, StoreContext } from '../../types'
    import CodeEditor from './CodeEditor.svelte'
    import LoadingIndicator from '../loadingIndicator/LoadingIndicator.svelte'
    import OutputPanel from '../output/OutputPanel.svelte'
    import { Output, OutputType } from '../output/types'
    import RunBar from './RunBar.svelte'

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")
    const TABLE_NAME = "p1_newTableName"

    let codeSnippet: string
    let output: Output | undefined
    let showLoadingIndicator = false
    let showOutput = false

    onMount(async () => {
        await loadTable(TABLE_NAME, requestContext)
    })

    async function onRun(): Promise<void> {
        console.log(`Execute code snippet '${codeSnippet}'`)
        showLoadingIndicator = true

        try {
            await executeCodeSnippet(codeSnippet, requestContext)
            output = new Output(OutputType.Info, "Successfully Executed Code")

            const response = await getDataFrame(TABLE_NAME, requestContext)
            await storeContext.updateRows(TABLE_NAME, response.data)
        } catch (error: unknown) {
            output = new Output(OutputType.Error, error.body?.error ?? `${error}`)
        }

        showLoadingIndicator = false
        showOutput = true
    }
</script>

<div class="main-container">
    <RunBar bind:showOutput={showOutput} on:run={onRun}/>
    {#if showLoadingIndicator}
        <LoadingIndicator />
    {:else if showOutput}
        <OutputPanel {output}/>
    {:else}
        <CodeEditor bind:codeSnippet={codeSnippet}/>
    {/if}
</div>

<style lang="sass">
  @use "../../../style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1
    overflow-x: hidden
</style>
