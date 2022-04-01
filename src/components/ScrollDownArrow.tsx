import React from 'react';
import { Box, Grow, IconButton, SxProps } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { keyframes } from '@emotion/react';

const downArrowAnimation = keyframes`
  0% {
    transform: scale(1,1) translate(0px, 0px);
  }

  30%{
    transform: scale(1,0.8) translate(0px, 10px); 
  }

  75%{
    transform: scale(1,1.1) translate(0px, -25px); 
  }

  100% {
    transform: scale(1,1) translate(0px, 0px);
  }
`

const ScrollDownArrow: React.FC<IScrollDownArrowProps> = ({scrollRef, titleRef}) => {

   const onDownArrowClick = () => {
      const secondSectionTop = document.getElementById('about-the-book')?.offsetTop ?? 0;
      const titleHeight = titleRef.current?.clientHeight ?? 0;
      scrollRef?.current?.scrollTo({left: 0, top: (secondSectionTop - titleHeight - 100), behavior: "smooth"});
    }

    const absoluteCentering: SxProps = {
      position: 'absolute',
      mL: 'auto',
      mR: 'auto',
      left: '0',
      right: '0',
      textAlign: 'center'
    }

   return (
      <Grow in={true} timeout={1000} style={{ transitionDelay: `500ms`}}>
        <Box sx={{...absoluteCentering, bottom: '1rem'}}>
          <IconButton onClick={onDownArrowClick} sx={{background: '#858282', boxShadow: 3, zIndex: 1, animation: `${downArrowAnimation} 1.25s infinite`}}>
          <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </Grow>
   );
};

export interface IScrollDownArrowProps {
   scrollRef: React.RefObject<HTMLDivElement>,
   titleRef: React.RefObject<HTMLDivElement>
}

export default ScrollDownArrow;