import { NavLink } from '@remix-run/react';


export default function ItemListLayout(props) {
  const { data, itemClass, linkClass, imgClass, textClass, imgSrc, onMouseOver, onMouseOut } = props;

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
  )

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
