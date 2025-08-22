import React from 'react';
import type { CardIconProps } from '~/types/common';
import SvgLoader from './SvgLoader';

function CardIcon(CardIconProps: CardIconProps) {
  return (
    <>
      {/*<!-- Component: Card with icon --> */}
      <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
        {/*  <!-- Icon --> */}
        <figure className="p-6 pb-0">
          {CardIconProps.iconName ? (
            <SvgLoader
              iconName={CardIconProps.iconName}
              alt={CardIconProps.alt || ''}
              className="mx-auto h-16 w-16"
            />
          ) : (
            <img src={CardIconProps.iconPath} alt={CardIconProps.alt} />
          )}
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          {<h3 className="mb-4 text-xl font-medium text-slate-700">{CardIconProps.text_title}</h3>}
          {CardIconProps.text_content && <p>{CardIconProps.text_content}</p>}
        </div>
      </div>
      {/*<!-- End Card with icon --> */}
    </>
  );
}

export default CardIcon;
