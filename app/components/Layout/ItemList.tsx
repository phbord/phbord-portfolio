import { Link } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function ItemList(props) {
  const { data, itemClass, linkClass, imgClass, textClass, imgSrc} = props;
  const [newTextClass] = useState(textClass ? textClass : 'sr-only');

  const contentBlock = (
    <>
      {
        imgSrc && (
          <img src={imgSrc} alt={data.name} className={imgClass} />
        )
      }
      {
        data.name && (
          <span className={newTextClass}>
            {data.name}
          </span>
        )
      }
    </>
  )

  return (
    <>
      <li key={uuidv4()} className={itemClass}>
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
