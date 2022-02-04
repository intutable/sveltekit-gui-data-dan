<script lang="ts">
    import { LoadingIndicator, Output, OutputPanel, OutputType } from "@intutable/common-gui"
    import { getContext } from "svelte"
    import { refreshTableData } from "../fetch"
    import { refreshHistory } from "../history/fetch"
    import { RequestContext, StoreContext } from "../types"
    import ActionBar from "./ActionBar.svelte"
    import CodeEditor from "./CodeEditor.svelte"
    import { executeCodeSnippet } from "./fetch"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    let codeSnippet: string
    let output: Output | undefined
    let showLoadingIndicator = false
    let showOutput = false

    async function onRun(): Promise<void> {
        showLoadingIndicator = true

        try {
            await executeCodeSnippet(codeSnippet, requestContext)
        } catch (error) {
            onError(error)
            return
        }

        output = new Output(OutputType.Info, "Successfully executed code")
        showLoadingIndicator = false
        showOutput = true

        await refreshHistory(requestContext)
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
        <LoadingIndicator title="Executing Code" />
    {:else if showOutput}
        <OutputPanel {output} />
    {:else}
        <CodeEditor bind:codeSnippet={codeSnippet} />
    {/if}
</div>

<style lang="sass">
  @use "../../../../node_modules/@intutable/common-gui/dist/style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1
    overflow-x: hidden
</style>
