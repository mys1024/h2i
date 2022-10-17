import { toPng } from 'html-to-image'
import { Show, createSignal } from 'solid-js'
import Editor from '~/components/Editor'

let sandbox: HTMLDivElement

const defaultHtml = `<div class="box">
Hi 😊
</div>`

const defaultCss = `.box {
  color: skyblue;
  font-size: 3em;
}`

const [html, setHtml] = createSignal(defaultHtml)
const [css, setCss] = createSignal(defaultCss)
const [previewSrc, setPreviewSrc] = createSignal('')

async function updatePreview() {
  const url = await toPng(sandbox)
  setPreviewSrc(url)
}

export default () => (
  <div
    space-y-12
    flex flex-col
    min-h-100vh
    items-center
    bg="#282c34"
    text-white
  >
    {/* sandbox */}
    <div>
      <div
        id="sandbox"
        ref={sandbox}
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={html()}
      />
      <style
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={css()}
      />
    </div>
    {/* preview */}
    <Show
      when={previewSrc()}
    >
      <img
        id="preview"
        alt="preview"
        src={previewSrc()}
      />
    </Show>
    {/* editors */}
    <div space-x-4 flex flex-row>
      <Editor
        code={html()}
        update={code => setHtml(code)}
        title="html-editor"
        placeholder="HTML"
      />
      <Editor
        code={css()}
        update={code => setCss(code)}
        title="css-editor"
        placeholder="CSS"
      />
    </div>
    {/* button */}
    <div>
      <button onClick={updatePreview}>Preview</button>
    </div>
  </div>
)
