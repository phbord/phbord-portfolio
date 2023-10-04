import { Link } from '@remix-run/react';


export default function ItemListLayout(props) {
  const { data, itemClass, linkClass, imgClass, textClass, imgSrc } = props;

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
              <Link to={data.href} className={linkClass}>
                {contentBlock}
              </Link>
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
