<script lang="ts">
    import { getContext, onMount } from "svelte"
    import { executeCodeSnippet, refreshTableData } from "../../fetch"
    import { RequestContext, StoreContext } from "../../types"
    import { historyStore } from "../history/store"
    import LoadingIndicator from "../loadingIndicator/LoadingIndicator.svelte"
    import OutputPanel from "../output/OutputPanel.svelte"
    import { Output, OutputType } from "../output/types"
    import CodeEditor from "./CodeEditor.svelte"
    import ActionBar from "./ActionBar.svelte"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    let codeSnippet: string
    let output: Output | undefined
    let showLoadingIndicator = false
    let showOutput = false

    onMount(async () => {
        await refreshTableData(requestContext, storeContext)
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

        await refreshTableData(requestContext, storeContext)
    }

    function onError(error: unknown): void {
        console.error(error)
        output = new Output(OutputType.Error, error.body?.error ?? `${error}`)
        showLoadingIndicator = false
        showOutput = true
    }
</script>

<div class="main-container">
    <ActionBar bind:showOutput={showOutput} on:run={onRun} />
    {#if showLoadingIndicator}
        <LoadingIndicator />
    {:else if showOutput}
        <OutputPanel {output} />
    {:else}
        <CodeEditor bind:codeSnippet={codeSnippet} />
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
