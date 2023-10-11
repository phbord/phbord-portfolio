import { NavLink } from '@remix-run/react';


interface ItemListLayoutProps {
  data: DataItemListLayoutInterface;
  itemClass?: string;
  linkClass?: string;
  imgClass?: string;
  textClass?: string;
  imgSrc?: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

interface DataItemListLayoutInterface {
  name: string;
  href?: string;
}


export default function ItemListLayout({data, itemClass, linkClass, imgClass, textClass, imgSrc, onMouseOver, onMouseOut}: ItemListLayoutProps) {
  const contentBlock = (
    <>
      {
        imgSrc && (
          <img src={imgSrc} alt={data.name} className={imgClass} />
        )
      }
      {
        data.name && (
          <span className={textClass}>
            {data.name}
          </span>
        )
      }
    </>
  );

  return (
    <>
      <li className={itemClass}>
        {
          data.href
            ? (
              <NavLink to={data.href} 
                        className={linkClass} 
                        onMouseOver={onMouseOver} 
                        onMouseOut={onMouseOut}>
                {contentBlock}
              </NavLink>
            )
            : (
              <>
                {contentBlock}
              </>
            )
        }
      </li>
    </>
  )
}
