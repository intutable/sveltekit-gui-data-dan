<script lang="ts">
    import * as Monaco from "monaco-editor"
    import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
    import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
    import { onMount } from "svelte"

    export let codeSnippet = ""

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
            automaticLayout: true,
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
        })

        return () => { editor.dispose() }
    })
</script>

<div class="monaco-editor" bind:this={divElement}></div>

<style lang="sass">
  .monaco-editor
    height: 100%
    border-radius: 6px
    padding: 0.5rem 0 0.5rem 0
    overflow-x: hidden
</style>
