interface TooltipInterface {
  name?: string;
  className?: string;
}

export default function Tooltip({name, className}: TooltipInterface) {  
  return (
    <>
      {
        name && (
          <div className={`tooltips ${className}`}>
            {name}
          </div>
        )
      }
    </>
  )
}
