<script lang="ts">
    import { getContext, onMount } from "svelte"
    import type { RequestContext, StoreContext } from "../types"
    import { executeCodeSnippet, loadTable } from "./fetch"

    export let codeSnippet: string

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")
    const TABLE_NAME = "p1_newTableName"

    onMount(async () => {
        console.log(`Load table '${TABLE_NAME}'`)

        try {
            await loadTable(TABLE_NAME, requestContext)
            console.log(`Table '${TABLE_NAME}' loaded successfully!`)
        } catch (error) {
            console.log(error)
        }
    })

    function onOutput(): void {
        console.log("Show output")
    }

    async function onRun(): Promise<void> {
        console.log(`Execute code snippet '${codeSnippet}'`)

        try {
            const output = await executeCodeSnippet(codeSnippet, requestContext)
            await storeContext.updateRows(TABLE_NAME, output.data)
        } catch (error) {
            console.log(error)
        }
    }
</script>

<div class="button-container">
    <button class="output-button" on:click={onOutput}>Show Output</button>
    <button class="run-button" on:click={onRun}>
        <span class="play-icon">&#9658;</span>Run
    </button>
</div>

<style lang="sass">
  .button-container
    display: flex
    justify-content: space-between

  .play-icon
    font-size: 0.8rem
    margin-right: 0.5rem

  .run-button
    background: #2244aa
    color: white

  .output-button
    background: hsla(0, 0%, 0%, 0.05)
    color: rgb(51, 51, 51)

  button
    font:
      size: 0.9rem
      weight: 500
    padding: 0.4rem 0.8rem 0.4rem 0.8rem
    margin-bottom: 0.5rem
    border-radius: 6px
    border: none

  button:hover
    cursor: pointer
</style>
