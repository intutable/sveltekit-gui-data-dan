<script lang="ts">
    import * as Monaco from "monaco-editor"
    import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
    import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
    import { onMount } from "svelte"

    export let codeSnippet: string = ["function x() {", "\tconsole.log(\"Hello world!\");", "}"].join("\n")

    let divElement: HTMLDivElement | undefined = undefined
    let editor: Monaco.editor.IStandaloneCodeEditor

    onMount(async () => {
        // @ts-ignore
        self.MonacoEnvironment = {
            getWorker: (_: any, label: string) => {
                return label === "javascript" ? new TsWorker() : new EditorWorker()
            }
        }

        editor = Monaco.editor.create(divElement, {
            value: codeSnippet,
            language: "javascript",
            theme: "vs-dark",
            minimap: {
                enabled: false
            },
            scrollbar: {
                horizontalScrollbarSize: 5,
                verticalScrollbarSize: 5
            },
            scrollBeyondLastLine: false,
        })

        editor.getModel().onDidChangeContent(() => {
            codeSnippet = editor.getValue()
        });

        return () => { editor.dispose() }
    })
</script>

<div class="editor">
    <div class="monaco-editor" bind:this={divElement}></div>
</div>

<style lang="sass">
  .editor
    border: 2px solid #1e1e1e
    border-radius: 6px
    padding: 0.5rem
    background: #1e1e1e
    height: 14rem

  .monaco-editor
    height: 100%
    overflow: hidden
</style>
