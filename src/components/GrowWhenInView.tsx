import { Grow } from '@mui/material';
import React, { useState } from 'react';
import InView from 'react-intersection-observer';

const GrowWhenInView: React.FC<IGrowWhenInViewProps> = ({threshold = 0.75, children}) => {
   const [isInView, setIsInView] = useState(false);

   return (
      <InView as="div" onChange={(inView) => setIsInView(inView)} threshold={threshold} triggerOnce={true} fallbackInView={true}>
         <Grow in={isInView} timeout={1250}>
            <div>{children}</div>
         </Grow>
      </InView>
   );
};

export interface IGrowWhenInViewProps {
   threshold?: number
}

export default GrowWhenInView;