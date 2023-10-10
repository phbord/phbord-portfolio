export default function Button(props) {
  const { children, className, srOnlyText, onClick, onMouseOver, onMouseOut, type } = props;

  return (
    <>
      <button className={className} 
              onClick={(e) => onClick(e)} 
              onMouseOver={onMouseOver} 
              onMouseOut={onMouseOut}
              type={type}>
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
