<script lang="ts">
    import { getContext, onDestroy } from "svelte"
    import { refreshTableData } from "../fetch"
    import { getHistory, loadHistory, rollback, saveHistory } from "./fetch"
    import { historyStore } from "./store"
    import { RequestContext, StoreContext } from "../types"
    import ActionBar from "./ActionBar.svelte"
    import type { History } from "./types"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    let history: History | undefined

    const unsubscribe = historyStore.subscribe(() => {
        fetchHistory()
    })

    onDestroy(unsubscribe)

    async function fetchHistory() {
        console.log("Fetch history")

        try {
            history = await getHistory(requestContext)
        } catch (error) {
            console.error(error)
        }
    }

    async function onRollback(snippet: string, head: number): Promise<void> {
        console.log(`Rollback to head: '${head}'`)

        try {
            await rollback(head, requestContext)
            await refreshTableData(requestContext, storeContext)
            await fetchHistory()
        } catch (error) {
            console.error(error)
        }
    }

    async function onLoad(): Promise<void> {
        console.log("Load history")

        try {
            await loadHistory("script", requestContext)
            await fetchHistory()
        } catch (error) {
            console.error(error)
        }
    }

    async function onSave(): Promise<void> {
        console.log("Save history")

        try {
            await saveHistory("script", requestContext)
        } catch (error) {
            console.error(error)
        }
    }
</script>

<div class="main-container">
    <ActionBar on:rollback={() => onRollback("", 2)} on:load={onLoad} on:save={onSave} />

    {#if !history || history.snippets.length < 3}
        <div class="no-results">No history available.</div>
    {:else}
        <div class="header">Snippet</div>
        <div class="snippet-container">
            {#each history.snippets.slice(2) as snippet, i}
                <div
                    class="snippet"
                    class:selected={history.head === i + 3}
                    on:click={onRollback(snippet, i + 3)}
                >
                    {snippet}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="sass">
  @use "../../../../node_modules/@intutable/common-gui/dist/style/theme"
  @use "../../../../node_modules/@intutable/common-gui/dist/style/util"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
    flex: 1
    overflow-x: hidden

  .no-results
    @extend .center-content
    flex-direction: column
    color: hsla(0, 0%, 0%, 0.5)
    line-height: 1.5rem

  .header
    display: flex
    justify-content: space-between
    padding: 0 0.3rem 0 0.3rem
    font-weight: bold

  .snippet-container
    margin-top: 0.5rem
    overflow-y: auto

  .snippet
    @extend .rounded-border
    padding: 0.3rem

  .snippet:not(:first-child)
    margin-top: 0.6rem

  .snippet:hover
    background-color: #bbbbbb
    cursor: pointer

  .selected
    background-color: rgba(0, 0, 0, 0.05)
</style>
