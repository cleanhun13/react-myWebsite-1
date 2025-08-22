import { ReactSVG } from 'react-svg';
type HTMLWrapperType = HTMLDivElement | HTMLSpanElement;
import { FaBeer } from 'react-icons/fa';
import React from 'react';

type DynamicIconProps = {
  name: string;
  className: string;
  isReactIcons?: boolean;
  onClick?:
    | (React.MouseEventHandler<HTMLWrapperType> & React.MouseEventHandler<SVGSVGElement>)
    | undefined;
  style?: React.CSSProperties & Record<string, string>;
};

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className,
  isReactIcons = false,
  onClick = undefined,
  style = { width: '3rem', height: '3rem' },
}: DynamicIconProps) => {
  let strStyle = '';
  if (!isReactIcons) {
    Object.keys(style).forEach(key => {
      strStyle += `${key}: ${style[key]};`;
    });
  }
  return isReactIcons ? (
    <FaBeer className={className} style={style as React.CSSProperties} />
  ) : (
    <ReactSVG
      src={`/icons/${name}.svg`}
      className={className}
      loading={() => <span>Loading</span>}
      fallback={() => <div className="h-min">Error!</div>}
      onClick={onClick}
      onError={error => {
        console.error(error);
      }}
      beforeInjection={svg => {
        svg.setAttribute('style', strStyle);
      }}
    />
  );
};

export default DynamicIcon;
