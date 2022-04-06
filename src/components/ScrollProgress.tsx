import { Box } from '@mui/material';
import React from 'react';

const ScrollProgress: React.FC<IScrollProgressProps> = ({scrollPercent}) => {
   return (
      <Box sx={{height: '0.25rem', position: 'fixed', width: '100%', bottom: 0, pt: '0.75rem'}}>
         < Box sx={{background: 'green', width: `${scrollPercent}%`, height: '100%'}}/>
      </Box> 
   );
};

export interface IScrollProgressProps {
   scrollPercent: number;
}

export default ScrollProgress;