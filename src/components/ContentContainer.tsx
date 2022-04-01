import { Box, SxProps } from '@mui/material';
import React from 'react';

const ContentContainer: React.FC = ({children}) => {
   const descriptionContainer: SxProps = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '1rem',
      paddingX: '3rem',
      background: 'black',
      color: 'white',
      fontSize: '1.5rem',
      maxWidth: '80rem',
      margin: 'auto',
      minHeight: '500px'
    }

   return (
      <Box sx={descriptionContainer}>
         {children}
      </Box>
   );
};

export default ContentContainer;