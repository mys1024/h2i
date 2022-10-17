export default (
  props: {
    code: string
    update: (code: string) => void
    title: string
    placeholder: string
  },
) => (
  <div>
    <textarea
      cols="30"
      rows="10"
      outline-none
      p-2
      text-black
      value={props.code}
      name={props.title}
      title={props.title}
      placeholder={props.placeholder}
      onInput={
        evt => props.update((evt.target as HTMLTextAreaElement).value)
      }
    />
  </div>
)
