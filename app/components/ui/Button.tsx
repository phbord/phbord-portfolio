export default function Button(props) {
  const { children, className, srOnlyText, onClick, onMouseOver, onMouseOut } = props;

  return (
    <>
      <button className={className} 
              onClick={(e) => onClick(e)} 
              onMouseOver={onMouseOver} 
              onMouseOut={onMouseOut}>
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
