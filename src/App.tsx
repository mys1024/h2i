import { toJpeg, toPng, toSvg } from 'html-to-image'
import { createSignal } from 'solid-js'
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

export default () => {
  const [html, setHtml] = createSignal(defaultHtml)
  const [css, setCss] = createSignal(defaultCss)
  const [url, setUrl] = createSignal('')
  let anchor: HTMLAnchorElement

  async function save(type: 'png' | 'jpg' | 'svg') {
    switch (type) {
      case 'png':
        setUrl(await toPng(sandbox))
        break
      case 'jpg':
        setUrl(await toJpeg(sandbox))
        break
      case 'svg':
        setUrl(await toSvg(sandbox))
        break
      default:
        throw new Error(`Unknown type: ${type}`)
    }
    anchor.click()
  }

  return (
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
        <a ref={anchor} href={url()} download="image" />
      </div>
      {/* button */}
      <div space-x-4>
        <button
          px-2 py-1
          rounded transition-250 bg="gray hover:sky"
          onClick={() => save('png')}
        >
          Save as PNG
        </button>
        <button
          px-2 py-1
          rounded transition-250 bg="gray hover:sky"
          onClick={() => save('jpg')}
        >
          Save as JPG
        </button>
        <button
          px-2 py-1
          rounded transition-250 bg="gray hover:sky"
          onClick={() => save('svg')}
        >
          Save as SVG
        </button>
      </div>
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
      {/* footer */}
      <Footer />
    </div>
  )
}
