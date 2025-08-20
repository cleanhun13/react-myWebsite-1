import React from 'react';
import type { CardIconProps } from '@/types/common';

function CardIcon(CardIconProps: CardIconProps) {
  return (
    <>
      {/*<!-- Component: Card with icon --> */}
      <div className="overflow-hidden text-center bg-white rounded shadow-md text-slate-500 shadow-slate-200">
        {/*  <!-- Icon --> */}
        <figure className="p-6 pb-0">
          {CardIconProps.iconName ? (
            <SvgIcon iconName={CardIconProps.iconName} width={64} height={64} />
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
