import { onMount } from 'solid-js'
import * as monaco from 'monaco-editor'
import DefaultWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

// workers
const defaultWorker = new DefaultWorker()
const htmlWorker = new HtmlWorker()

// monaco env
self.MonacoEnvironment = {
  getWorker(workerId: string, label: string) {
    if (label === 'html')
      return htmlWorker
    return defaultWorker
  },
}

export default (
  props: {
    code: string
    lang: 'text' | 'html' | 'css'
    update: (code: string) => void
  },
) => {
  let container: HTMLDivElement
  onMount(() => {
    const editor = monaco.editor.create(container as HTMLDivElement, {
      value: props.code,
      language: props.lang,
      theme: 'vs-dark',
      minimap: { enabled: false },
    })
    editor.onDidChangeModelContent(() => {
      props.update(editor.getValue())
    })
  })
  return <div ref={container} w-full h-full />
}
