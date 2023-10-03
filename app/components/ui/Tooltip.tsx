export default function Tooltip({name, className}) {
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
