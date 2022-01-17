<script lang="ts">
    import { getContext, onMount, SvelteComponent } from "svelte"
    import { executeCodeSnippet } from "../fetch"
    import { CommonUiContext, RequestContext, RequestError, StoreContext } from "../types"
    import CodeEditor from "./editor/CodeEditor.svelte"
    import OutputPanel from "./output/OutputPanel.svelte"
    import { Output, OutputType } from "./output/types"
    import RunBar from "./runBar/RunBar.svelte"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")
    const commonUiContext = getContext<CommonUiContext>("commonUi")
    const TABLE_NAME = "p1_newTableName"

    let codeSnippet: string
    let output: Output | undefined
    let loadingIndicator: SvelteComponent
    let showLoadingIndicator = false
    let showOutput = false

    onMount(async () => {
        loadingIndicator = commonUiContext.getLoadingIndicator()
    })

    async function onRun(): Promise<void> {
        console.log(`Execute code snippet '${codeSnippet}'`)
        showLoadingIndicator = true

        try {
            const response = await executeCodeSnippet(codeSnippet, requestContext)

            const message = response.message.charAt(0).toUpperCase() + response.message.slice(1)
            output = new Output(OutputType.Info, message)

            await storeContext.updateRows(TABLE_NAME, response.data)
        } catch (error: RequestError) {
            const message = await error.body.error
            output = new Output(OutputType.Error, message)
        }

        showLoadingIndicator = false
        showOutput = true
    }
</script>

<div class="main-container">
    <RunBar bind:showOutput={showOutput} on:run={onRun} />
    {#if showLoadingIndicator}
        <svelte:component this={loadingIndicator} title="Executing Code" />
    {:else if showOutput}
        <OutputPanel {output} />
    {:else}
        <CodeEditor bind:codeSnippet={codeSnippet} />
    {/if}
</div>

<style lang="sass">
  @use "../../style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1
    overflow-x: hidden
</style>
