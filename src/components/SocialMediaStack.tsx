import { Box, Stack, IconButton } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialMediaStack: React.FC = () => {
   const facebookUrl = "https://www.facebook.com/WindsofShadow";
   const twitterUrl = "https://twitter.com/windsofs";

   const centerContent: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center'
    }

   return (
      <Box sx={{...centerContent, flexDirection: 'column', mb: '2rem', mt:'5rem'}}>
         <Box>Follow Winds of Shadow on social media for the latest updates!</Box>
         <Stack direction='row' spacing={2} sx={{width: '100%', justifyContent: 'center', pt: '1rem'}}>
         <IconButton size='medium' href={facebookUrl} sx={{background: 'white', borderRadius: '0.25rem'}}>
            <FacebookIcon fontSize='large' sx={{color: '#007bff'}}/>
         </IconButton>
         <IconButton size='medium' href={twitterUrl} sx={{background: 'white', borderRadius: '0.25rem'}}>
            <TwitterIcon fontSize='large' sx={{color: '#1DA1F2'}}/>
         </IconButton>
         </Stack>
      </Box>
   );
};

export default SocialMediaStack;