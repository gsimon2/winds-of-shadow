import { Box, keyframes } from '@mui/material';
import React, { useState } from 'react';
import InView from 'react-intersection-observer';

const swellAnimation = keyframes`
  0% {
   opacity: 0;
    transform: scale(0,0);
  }
  
  100% {
    transform: scale(1,1);
    opacity: 1;
  }
`

const AnimateWhenInView: React.FC = ({children}) => {
   const [isInView, setIsInView] = useState(false);

   return (
      <InView as="div" onChange={(inView) => setIsInView(inView)} threshold={1} triggerOnce={true} fallbackInView={true}>
         <Box sx={{opacity: isInView ? 1 : 0, animation: `${isInView ? swellAnimation : undefined} 1s 1`}}>
            <div>{children}</div>
         </Box>
      </InView>
   );
};

export default AnimateWhenInView;