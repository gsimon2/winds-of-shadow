import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { CssConstants } from '../constants/CssConstants';

const ParallaxContainer: React.FC<IParallaxContainerProps> = ({imagePath, children, style = {}}) => {
  const isMobileView = useMediaQuery(`(max-width:${CssConstants.mobileBreakpoint})`);

   const parallax: React.CSSProperties = {
      height: '100%',
      width: '100%',
      backgroundAttachment: isMobileView ? 'scroll' : 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }

   return (
      <Box sx={{...parallax, ...style, backgroundImage: `url(${imagePath})`}}>
         {children}
      </Box>
   );
};

export interface IParallaxContainerProps {
   imagePath: string,
   style?: React.CSSProperties
}

export default ParallaxContainer;