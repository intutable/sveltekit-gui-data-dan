<script lang="ts">
    import { getContext, onMount } from "svelte"
    import { refreshTableData } from "../fetch"
    import { RequestContext, StoreContext } from "../types"
    import ActionBar from "./ActionBar.svelte"
    import { loadHistory, refreshHistory, rollback, saveHistory } from "./fetch"
    import { historyStore } from "./store"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    onMount(async () => {
        await refreshHistory(requestContext)
    })

    async function onRollback(snippet: string, head: number): Promise<void> {
        try {
            await rollback(head, requestContext)
            await refreshHistory(requestContext)
            await refreshTableData(requestContext, storeContext)
        } catch (error) {
            console.log(error)
        }
    }

    async function onLoad(): Promise<void> {
        try {
            await loadHistory("script", requestContext)
            await refreshHistory(requestContext)
        } catch (error) {
            console.error(error)
        }
    }

    async function onSave(): Promise<void> {
        try {
            await saveHistory("script", requestContext)
        } catch (error) {
            console.error(error)
        }
    }
</script>

<div class="main-container">
    <ActionBar on:rollback={() => onRollback("", 2)} on:load={onLoad} on:save={onSave} />

    {#if !$historyStore || $historyStore.snippets.length < 3}
        <div class="no-results">No history available.</div>
    {:else}
        <div class="header">Snippet</div>
        <div class="snippet-container">
            {#each $historyStore.snippets.slice(2) as snippet, i}
                <div
                    class="snippet"
                    class:selected={$historyStore.head === i + 3}
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
    flex: 1 1 auto
    height: 20rem
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
