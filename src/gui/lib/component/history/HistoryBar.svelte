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
  @use "../../../style/util"

  .button-container
    display: flex
    justify-content: flex-end
    gap: 0.5rem

  .rollback-button
    margin-right: auto

  .load-button, .rollback-button
    @extend .plain-button

  .save-button
    @extend .highlighted-button

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
