export default function Button({children, className, srOnlyText, onClick}) {
  return (
    <>
      <button className={className} onClick={(e) => onClick(e)}>
        {
          srOnlyText
          && srOnlyText !== ''
          && (
            <span className="sr-only">
              {srOnlyText}
            </span>
          )
        }
        {children}
      </button>
    </>
  )
}
