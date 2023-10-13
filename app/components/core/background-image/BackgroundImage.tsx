import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";


interface BackgroundImageInterface {
  children: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
  containerClassName?: string;
  contentClassName?: string;
  imgUrl?: string;
}

export default function BackgroundImage({children, containerClassName, contentClassName, imgUrl}: BackgroundImageInterface) {
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
