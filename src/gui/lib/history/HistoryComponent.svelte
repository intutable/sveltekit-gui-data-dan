<script lang="ts">
    import { afterUpdate, beforeUpdate, getContext, onMount } from "svelte"
    import { refreshTableData } from "../fetch"
    import { RequestContext, StoreContext } from "../types"
    import ActionBar from "./ActionBar.svelte"
    import { loadHistory, refreshHistory, rollback, saveHistory } from "./fetch"
    import { historyStore } from "./store"

    const requestContext = getContext<RequestContext>("request")
    const storeContext = getContext<StoreContext>("store")

    let container: HTMLDivElement | undefined
    let autoscroll = false

    /**
     * On mount, refresh the current history and scroll to the bottom.
     */
    onMount(async () => {
        await refreshHistory(requestContext)
        container.scrollTo(0, container.scrollHeight)
    })

    /**
     * Check if the autoscroll should be enabled (hence the user scrolled to the bottom).
     */
    beforeUpdate(() => {
        if (container) {
            autoscroll = container.offsetHeight + container.scrollTop > container.scrollHeight - 20
        }
    })

    /**
     * If autoscroll is enabled, scroll to the botton of the container, after an update happened.
     */
    afterUpdate(() => {
        if (autoscroll) {
            container.scrollTo(0, container.scrollHeight)
        }
    })

    /**
     * Rolls back all the changes until the index of `head`.
     * @param head Index to roll back the changes to
     */
    async function onRollback(head: number): Promise<void> {
        try {
            await rollback(head, requestContext)
            await refreshHistory(requestContext)
            await refreshTableData(requestContext, storeContext)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Loads the history script named "script" from the database and refreshes the history.
     */
    async function onLoad(): Promise<void> {
        try {
            await loadHistory("script", requestContext)
            await refreshHistory(requestContext)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Saves the current history in the database under the script name "script".
     */
    async function onSave(): Promise<void> {
        try {
            await saveHistory("script", requestContext)
        } catch (error) {
            console.error(error)
        }
    }
</script>

<div class="main-container">
    <ActionBar on:load={onLoad} on:rollback={() => onRollback(0)} on:save={onSave} />
    {#if !$historyStore || $historyStore.snippets.length === 0}
        <div class="no-results">No history available.</div>
    {:else}
        <div class="header">Snippet</div>
        <div class="snippet-container" bind:this={container}>
            {#each $historyStore.snippets as snippet, i}
                <div
                    class="snippet"
                    class:selected={$historyStore.head === i + 1}
                    on:click={onRollback(i + 1)}
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
