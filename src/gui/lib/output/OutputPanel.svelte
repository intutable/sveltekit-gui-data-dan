<script lang="ts">
    import { Output } from "./types"
    import { OutputType } from "./types"

    export let output: Output = new Output(OutputType.Info, "No code executed yet")
</script>

{#if output}
    <div
        class="output-container"
        class:info={output.type === OutputType.Info}
        class:error={output.type === OutputType.Error}
    >
        <div class="title">{output.type === OutputType.Info ? "INFO" : "ERROR"}</div>
        {output.message}
    </div>
{/if}

<style lang="sass">
  .output-container
    height: 100%
    border-radius: 6px
    padding: 0.5rem

  .info
    background: hsla(0, 0%, 0%, 0.05)

  .error
    background: #FEDCE5

  .title
    color: gray
    font:
      weight: bold
      size: 0.8rem
    padding-bottom: 0.5rem
</style>
