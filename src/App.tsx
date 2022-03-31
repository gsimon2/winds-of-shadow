import './App.css';
import { Box, Container, Grid, Grow, SxProps, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import titleBackground from './assets/misty_mountains.jpg';
import bookCover from './assets/book-cover.jpg';
import authorPhoto from './assets/author-photo.jpg';
import cavern from './assets/cavern.jpg';
import darkForest from './assets/dark-forest.webp';
import React, { createRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { keyframes } from '@emotion/react';

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

function App() {
  const isMobileView = useMediaQuery(`(max-width:900px)`);
  const [isStickyTitle, setIsStickyTitle] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const titleRef = createRef<HTMLDivElement>();
  const scrollRef = createRef<HTMLDivElement>();
  const amazonUrl = "https://www.amazon.com/Winds-Shadow-Wind-Whispers-Book/dp/B096HS1XM1";

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuItemClick = (elementId: string) => {
    const element = document.getElementById(elementId);
    scrollRef?.current?.scrollTo({left: 0, top: element?.offsetTop ?? 0, behavior: "smooth"});
    handleMenuClose();
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const onDownArrowClick = () => {
    const secondSectionTop = document.getElementById('about-the-book')?.offsetTop ?? 0;
    const titleHeight = titleRef.current?.clientHeight ?? 0;
    scrollRef?.current?.scrollTo({left: 0, top: (secondSectionTop - titleHeight - 100), behavior: "smooth"});
  }

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

    if ( !showDownArrow && (scrollRef.current?.scrollTop ?? 0) <= 10) {
      setShowDownArrow(true);
    }

    if ( showDownArrow && (scrollRef.current?.scrollTop ?? 0) > 10) {
      setShowDownArrow(false);
    }
  }

  return (
    <Box ref={scrollRef} sx={{height: '100%', width: '100%', overflow: 'auto'}} onScroll={handleScroll}>

      {/* Navigation Menu */}
      <Box sx={{position: 'absolute', right: '1.75rem', background: '#858282', zIndex: 1, top: '0.5rem', boxShadow: 3, borderRadius: '0.5rem'}}>
        <IconButton id='navigation-button' aria-label='Navigation Menu' size='large' onClick={handleMenuButtonClick} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} aria-controls={open ? 'navigation-menu' : undefined}>
          <MenuIcon />
        </IconButton>
        <Menu
          id='navigation-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'navigation-button',
          }}
        >
          <MenuItem onClick={() => onMenuItemClick('title')}>Title</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('about-the-book')}>About the Book</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('get-a-copy')}>Get a Copy</MenuItem>
          <MenuItem onClick={() => onMenuItemClick('about-the-author')}>About the Author</MenuItem>
        </Menu>
      </Box>

      {/* Scroll Down Arrow */}
      {showDownArrow &&
        <Grow in={true} timeout={1000} style={{ transitionDelay: `500ms`}}>
          <IconButton onClick={onDownArrowClick} sx={{position: 'absolute', background: '#858282', boxShadow: 3, zIndex: 1, left: '50%', transform: 'translateX(-50%)', bottom: '1rem', animation: `${downArrowAnimation} 1.25s infinite`}}>
            <ArrowDownwardIcon />
          </IconButton>
        </Grow>}
      
      {/* Title Seciton */}
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
