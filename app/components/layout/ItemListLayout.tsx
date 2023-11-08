import { NavLink } from '@remix-run/react';


interface ItemListLayoutProps {
  data: DataItemListLayoutInterface;
  itemClass?: string;
  linkClass?: string;
  imgClass?: string;
  textClass?: string;
  imgSrc?: string;
  isNotItem?: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

interface DataItemListLayoutInterface {
  name: string;
  href?: string;
}


export default function ItemListLayout({data, itemClass, linkClass, imgClass, textClass, imgSrc, isNotItem=false, onClick, onMouseOver, onMouseOut}: ItemListLayoutProps) {
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

  const navLinkBlock = (
    <NavLink to={data.href} 
              className={linkClass} 
              onClick={onClick}
              onMouseOver={onMouseOver} 
              onMouseOut={onMouseOut}>
      {contentBlock}
    </NavLink>
  );

  return (
    <>
      {
        isNotItem
          ? (
            data.href ? navLinkBlock : contentBlock
          )
          : (
            <li className={itemClass}>
              { data.href ? navLinkBlock : contentBlock }
            </li>
          )
      }
    </>
  )
}
