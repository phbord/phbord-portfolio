export default function BackgroundImage({children, containerClassName, contentClassName, imgUrl, }) {
  return (
    <>
      {
        imgUrl && (
          <section className={containerClassName} style={{backgroundImage: `url(${imgUrl})`}}>
            <div className={contentClassName}>
              {children}
            </div>
          </section>
        )
      }
    </>
  )
}
