<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatcher = createEventDispatcher()
</script>

<div class="button-container">
    <button class="rollback-button" on:click={() => dispatcher("rollback")}>Rollback All</button>
    <button class="load-button" on:click={() => dispatcher("load")}>Load</button>
    <button class="save-button" on:click={() => dispatcher("save")}>Save</button>
</div>

<style lang="sass">
  @use "../../../../node_modules/@intutable/common-gui/dist/style/theme"

  .button-container
    display: flex
    justify-content: flex-end
    gap: 0.5rem

  .load-button, .rollback-button, .save-button
    margin: 0 0 0.5rem 0

  .rollback-button
    margin-right: auto

  .load-button, .rollback-button
    @extend .plain-button

  .save-button
    @extend .highlighted-button
</style>
