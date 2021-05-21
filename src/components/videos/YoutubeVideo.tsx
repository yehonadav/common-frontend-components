import React from 'react'
import { useXS } from '../../stores'

interface YoutubeVideoProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  title: string;
  src: string;
}

export const YoutubeVideo:React.FC<YoutubeVideoProps> = (
  {
    title,
    src,
    ...props
  }) =>
{
  const isMobile = useXS();
  const vidWidth = `${isMobile ? 230 : 560}`;
  const vidHeight = `${isMobile ? 140 : 315}`;

  return (
    <iframe
      width={vidWidth}
      height={vidHeight}
      src={src}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...props}
    />
  )
}