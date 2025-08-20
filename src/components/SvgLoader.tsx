import React from 'react';

interface SvgLoaderProps {
  iconName: string;
  alt: string;
  className: string;
}

export default function SvgLoader(props: SvgLoaderProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [svgSrc, setSvgSrc] = React.useState('');
  
  React.useEffect(() => {
    // 动态导入SVG
    import(`../assets/icons/${props.iconName}.svg`)
      .then((module) => {
        setSvgSrc(module.default);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Failed to load SVG: ${props.iconName}`, error);
        setIsLoading(false);
      });
  }, [props.iconName]);
  
  if (isLoading) {
    return <div className={props.className}>Loading...</div>;
  }
  
  return <img src={svgSrc} alt={props.alt} className={props.className} />;
}
