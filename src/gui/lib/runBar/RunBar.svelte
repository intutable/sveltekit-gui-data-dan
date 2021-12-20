<script lang="ts">
    export let codeSnippet: string

    function onOutput(): void {
        console.log("Show output")
    }

    function onRun(): void {
        console.log(`Run code snippet: ${codeSnippet}`)
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
