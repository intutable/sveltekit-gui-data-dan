<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let showOutput: boolean

    $: outputButtonText = showOutput ? "Edit Code" : "Show Output"

    const dispatch = createEventDispatcher()

    function onToggleOutput(): void {
        showOutput = !showOutput
    }

    async function onRun(): Promise<void> {
        dispatch("run")
    }
</script>

<div class="button-container">
    <button class="output-button" on:click={onToggleOutput}>{outputButtonText}</button>
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
    margin: 0 0 0.5rem 0
    border-radius: 6px
    border: none

  button:hover
    cursor: pointer
</style>
