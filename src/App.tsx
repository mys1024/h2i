import { toJpeg, toPng, toSvg } from 'html-to-image'
import { createSignal } from 'solid-js'
import Editor from '~/components/Editor'
import Footer from '~/components/Footer'

const defaultHtml = `<div class="box">
  Hi 😊
</div>

<style>
  .box {
    color: skyblue;
    font-size: 3em;
  }
</style>
`

export default () => {
  let sandbox: HTMLDivElement
  let anchor: HTMLAnchorElement
  const [html, setHtml] = createSignal(defaultHtml)
  const [url, setUrl] = createSignal('')

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
      p-4 min-h-100vh
      flex flex-col items-center space-y-12
      bg-black text-white
    >
      {/* sandbox */}
      <div>
        <div
          id="sandbox"
          ref={sandbox}
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={html()}
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
      {/* editor */}
      <div h-125 w="full md:3/5 xl:2/5">
        <Editor
          lang='html'
          code={html()}
          update={code => setHtml(code)}
        />
      </div>
      {/* footer */}
      <Footer />
    </div>
  )
}
