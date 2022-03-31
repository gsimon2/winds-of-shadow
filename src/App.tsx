import './App.css';
import { Box, Container, Grid, Grow, SxProps, useMediaQuery } from '@mui/material';
import titleBackground from './assets/misty_mountains.jpg';
import bookCover from './assets/book-cover.jpg';
import authorPhoto from './assets/author-photo.jpg';
import cavern from './assets/cavern.jpg';
import darkForest from './assets/dark-forest.webp';
import React, { createRef, useState } from 'react';

const parallax: React.CSSProperties = {
  height: '100%',
  width: '100%',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

const title: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '100% !important',
  fontFamily: 'serif',
  margin: '0 1rem',
  textAlign: 'center'
}

const nonStickyTitle: React.CSSProperties = {
  position: 'relative',
  transform: 'translateY(-50%)',
  top: '50%',
}

const stickyTitle: React.CSSProperties = {
  position: 'sticky',
  top: 0
}

const centerContent: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center'
}

const descriptionContainer: React.CSSProperties = {
  paddingTop: '1rem',
  background: 'black',
  color: 'white',
  fontSize: '1.5rem'
}

const photoCircle: SxProps = {
  height: '400px',
  width: '400px',
  overflow: 'hidden',
  borderRadius: '50%',

  'img': {
    marginLeft: '-12%' // Should be -25% for centered photos
  }
}

function App() {
  const isMobileView = useMediaQuery(`(max-width:900px)`);
  const [isStickyTitle, setIsStickyTitle] = useState(false);
  const titleRef = createRef<HTMLDivElement>();
  const amazonUrl = "https://www.amazon.com/Winds-Shadow-Wind-Whispers-Book/dp/B096HS1XM1";

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = (event.target as HTMLDivElement);
    const titleHeight = titleRef.current?.clientHeight ?? 0;
    const isTitleAtTop = target.scrollTop >= ( (target.offsetHeight / 2) - (titleHeight / 2) );

    if (isTitleAtTop && !isStickyTitle) {
      setIsStickyTitle(true);
      return;
    }

    if (!isTitleAtTop && isStickyTitle) {
      setIsStickyTitle(false);
      return;
    }
  }

  return (
    <Box sx={{height: '100%', width: '100%', overflow: 'auto'}} onScroll={handleScroll}>
      <Box sx={{...parallax, backgroundImage: `url(${titleBackground})`}}>
          <Box sx={{ ...title, ...centerContent, ...(isStickyTitle ? stickyTitle : nonStickyTitle), flexDirection: 'column'}} ref={titleRef}>
            <Grow in={true} timeout={1000}>
              <h1 id="title" style={{margin: 0, fontSize: isMobileView ? '4rem' : '7rem'}}>
                Winds Of Shadow
              </h1>
            </Grow>
            <Grow in={true} timeout={1000}>
              <p style={{position: "relative", fontSize: isMobileView ? '1.5rem' : '2rem', margin: 0}}>By Benjamin J Stegenga</p>
            </Grow>
          </Box>
      </Box>

      <Box sx={descriptionContainer}>
        <Box sx={{
          maxWidth: '80rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 'auto',
          padding: '1.5rem',
          minHeight: '500px'
        }}>
          <Box sx={centerContent}>
            <h2 id="about-the-book" >About the Book</h2>
          </Box>
          <p>A world hanging on the edge of chaos and darkness lies before Sean. One cold fateful night in the deep of winter a warrior named Taylor stumbles upon Sean alone in the mountains. Their meeting triggers Sean toward adventure in the world sprawled before him, one they must protect. At each step in the journey Sean faces task after task meeting Ancient’s and exploring the Southern Wasted Lands.</p>
          <p>It is here that Sean pieces together who exactly the Proclaimer of Light is; the person destined to tip the scale of an eternal struggle of good versus evil. Can Sean discover what it means to be Ancient and save the world? Joining the war of Light against Dark, Sean unlocks the shrouded mystery of the hero: Orwick Stormbringer.</p>
        </Box>
      </Box>

      <Box sx={{...parallax, height: '300px', backgroundImage: `url(${darkForest})`, filter: 'brightness(0.75)'}} />

      <Container sx={descriptionContainer}>
        <Box sx={centerContent}>
          <h2 id="get-a-copy">Get a Copy</h2>
        </Box>
        <Grid container spacing={2} sx={{padding: '2rem 0'}}>
          <Grid item sx={centerContent} md={6} xs={12}>
            <p>Buy Now on <a href={amazonUrl} target="_blank" rel="noreferrer" >Amazon</a>!</p>
          </Grid>
          <Grid item sx={centerContent} md={6} xs={12}>
            <img src={bookCover} alt="Winds of Shadow book cover" />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{...parallax, height: '300px', backgroundImage: `url(${cavern})`, filter: 'brightness(0.75)'}} />

      <Container sx={descriptionContainer}>
        <Box sx={centerContent}>
          <h2 id="about-the-author">About the Author</h2>
        </Box>
        <Grid container spacing={2} sx={{padding: '2rem 0'}}>
          <Grid item sx={centerContent} md={6} xs={12}>
            <Box sx={isMobileView ? photoCircle : {}}>
              <img src={authorPhoto} alt="Winds of Shadow author Benjamin J Stegenga" />
            </Box>
          </Grid>
          <Grid item sx={centerContent} md={6} xs={12}>
            <Box sx={{...centerContent, flexDirection: 'column', padding: '0 1.5rem', textAlign: 'center'}}>
              <p>Benjamin J Stegenga</p>
              <p>At a young age Ben took to reading like a bird to hunting worms. Each book conquered grew his imagination until one day reading simply did not seem enough. Taking pen in hand a story was written, the likes of which Ben had been wanting to read for years. Now as a published author to Winds of Shadow, once more Ben will take up pen to continue on the story and prepare book 2 in the series for release.</p>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App;
