<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let showOutput: boolean

    $: outputButtonText = showOutput ? "Edit Code" : "Show Output"

    const dispatcher = createEventDispatcher()
</script>

<div class="button-container">
    <button class="output-button" on:click={() => showOutput = !showOutput}>{outputButtonText}</button>
    <button class="run-button" on:click={() => dispatcher("run")}>
        <span class="play-icon">&#9658;</span>Run
    </button>
</div>

<style lang="sass">
  @use "../../../style/util"

  .button-container
    display: flex
    justify-content: space-between

  .play-icon
    font-size: 0.8rem
    margin-right: 0.5rem

  .run-button
    @extend .highlighted-button

  .output-button
    @extend .plain-button

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
