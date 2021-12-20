<script lang="ts">
    import CodeEditor from "./editor/CodeEditor.svelte"

    let codeSnippet: string
</script>

<div class="main-container">
    <CodeEditor bind:codeSnippet={codeSnippet}/>
</div>

<style lang="sass">
  @use "../style/theme"

  .main-container
    @extend .theme-plain
    display: flex
    flex-direction: column
</style>
