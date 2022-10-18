import { toPng } from 'html-to-image'
import { Show, createSignal } from 'solid-js'
import Editor from '~/components/Editor'
import Footer from '~/components/Footer'

let sandbox: HTMLDivElement

const defaultHtml = `<div class="box">
Hi 😊
</div>
`

const defaultCss = `.box {
  color: skyblue;
  font-size: 3em;
}
`

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
    <div
      w-full h-120
      p-8
      grid grid-rows-1 grid-cols-2 gap-8
    >
      <Editor
        lang='html'
        code={html()}
        update={code => setHtml(code)}
      />
      <Editor
        lang='css'
        code={css()}
        update={code => setCss(code)}
      />
    </div>
    {/* button */}
    <div>
      <button onClick={updatePreview}>Preview</button>
    </div>
    {/* footer */}
    <Footer />
  </div>
)
