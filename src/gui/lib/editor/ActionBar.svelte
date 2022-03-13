<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let showOutput: boolean

    $: outputButtonText = showOutput ? "Edit Code" : "Show Output"

    const dispatcher = createEventDispatcher()
</script>

<div class="button-container">
    <button
        class="output-button"
        on:click={() => showOutput = !showOutput}>{outputButtonText}
    </button>
    <button class="run-button" on:click={() => dispatcher("run")}>
        <span class="play-icon">&#9658;</span>Run
    </button>
</div>

<style lang="sass">
  @use "../../../../node_modules/@intutable/common-gui/dist/style/theme"

  .button-container
    display: flex
    justify-content: space-between

  .output-button
    @extend .plain-button

  .run-button
    @extend .highlighted-button

  .output-button, .run-button
    margin: 0

  .play-icon
    font-size: 0.8rem
    margin-right: 0.5rem
</style>
