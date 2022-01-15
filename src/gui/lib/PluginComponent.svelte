<script lang="ts">
    import { getContext, onMount } from "svelte"
    import CodeEditor from "./editor/CodeEditor.svelte"
    import OutputPanel from "./output/OutputPanel.svelte"
    import { Output, OutputType } from "./output/types"
    import { executeCodeSnippet, loadTable } from "./runBar/fetch"
    import RunBar from "./runBar/RunBar.svelte"
    import { RequestContext, RequestError, StoreContext } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")
    const TABLE_NAME = "p1_newTableName"

    let codeSnippet: string
    let output: Output | undefined
    let showOutput: boolean

    onMount(async () => {
        console.log(`Load table '${TABLE_NAME}'`)

        try {
            await loadTable(TABLE_NAME, requestContext)
            console.log(`Table '${TABLE_NAME}' loaded successfully`)
        } catch (error) {
            console.log(error)
        }
    })

    async function onRun(): Promise<void> {
        console.log(`Execute code snippet '${codeSnippet}'`)

        try {
            const response = await executeCodeSnippet(codeSnippet, requestContext)

            const message = response.message.charAt(0).toUpperCase() + response.message.slice(1)
            output = new Output(OutputType.Info, message)

            await storeContext.updateRows(TABLE_NAME, response.data)
        } catch (error: RequestError) {
            const  message = await error.body.error
            output = new Output(OutputType.Error, message)
        }

        showOutput = true
    }
</script>

<div class="main-container">
    <RunBar bind:showOutput={showOutput} on:run={onRun}/>
    {#if showOutput}
        <OutputPanel {output}/>
    {:else}
        <CodeEditor bind:codeSnippet={codeSnippet}/>
    {/if}
</div>

<style lang="sass">
  @use "../style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1
    overflow-x: hidden
</style>
