<script lang="ts">
    import { LoadingIndicator, Output, OutputPanel, OutputType } from "@intutable/common-gui"
    import { getContext } from "svelte"
    import { refreshTableData } from "../fetch"
    import { refreshHistory } from "../history/fetch"
    import { RequestContext, StoreContext } from "../types"
    import ActionBar from "./ActionBar.svelte"
    import CodeEditor from "./CodeEditor.svelte"
    import { executeCodeSnippet } from "./fetch"
    import type { ExecuteCodeResponse } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    let codeSnippet: string
    let outputs: Output[] | undefined
    let showLoadingIndicator = false
    let showOutput = false

    async function onRun(): Promise<void> {
        showLoadingIndicator = true

        try {
            const response = await executeCodeSnippet(codeSnippet, requestContext)
            outputs = getConsoleOutput(response)
        } catch (error) {
            onError(error)
            return
        }

        showLoadingIndicator = false
        showOutput = true

        await refreshHistory(requestContext)
        await refreshTableData(requestContext, storeContext)
    }

    function onError(error: unknown): void {
        console.error(error)
        outputs = [new Output(OutputType.Error, error.body?.error ?? `${error}`)]
        showLoadingIndicator = false
        showOutput = true
    }

    function getConsoleOutput(response: ExecuteCodeResponse): Output[] {
        const consoleEntries = response.consoleArgEntries
        const error = consoleEntries.error.map(log => new Output(OutputType.Error, log.join(" - ")))
        const warn = consoleEntries.warn.map(log => new Output(OutputType.Warn, log.join(" - ")))
        const info = consoleEntries.info.map(log => new Output(OutputType.Info, log.join(" - ")))
        const log = consoleEntries.log.map(log => new Output(OutputType.Log, log.join(" - ")))
        const debug = consoleEntries.debug.map(log => new Output(OutputType.Debug, log.join(" - ")))

        const outputs: Output[] = [...error, ...warn, ...info, ...log, ...debug]

        if (outputs.length === 0) {
            return [new Output(OutputType.Info, "Successfully executed code")]
        }

        return outputs
    }
</script>

<div class="main-container">
    <ActionBar bind:showOutput={showOutput} on:run={onRun} />
    {#if showLoadingIndicator}
        <LoadingIndicator title="Executing Code" />
    {:else if showOutput}
        <OutputPanel {outputs} />
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
    gap: 1rem
</style>
