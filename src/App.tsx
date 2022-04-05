import { Box, Grid, Grow, SxProps, useMediaQuery } from '@mui/material';
import titleBackground from './assets/misty_mountains.jpg';
import bookCover from './assets/book-cover.jpg';
import authorPhoto from './assets/author-photo.jpg';
import cavern from './assets/cavern.jpg';
import darkForest from './assets/dark-forest.webp';
import React, { createRef, useState } from 'react';
import ParallaxContainer from './components/ParallaxContainer';
import NavButton from './components/NavButton';
import ScrollDownArrow from './components/ScrollDownArrow';
import ContentContainer from './components/ContentContainer';
import { CssConstants } from './constants/CssConstants';
import SocialMediaStack from './components/SocialMediaStack';
import GrowWhenInView from './components/GrowWhenInView';
import AnimateWhenInView from './components/AnimateWhenInView';

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

const photoCircle: SxProps = {
  height: '300px',
  width: '300px',
  overflow: 'hidden',
  borderRadius: '50%',

  'img': {
    marginLeft: '-43%' // Adjust this dependent on centering of used photo
  }
}


function App() {
  const isMobileView = useMediaQuery(`(max-width:${CssConstants.mobileBreakpoint})`);
  const [isStickyTitle, setIsStickyTitle] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);
  const titleRef = createRef<HTMLDivElement>();
  const scrollRef = createRef<HTMLDivElement>();
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

    if ( !showDownArrow && (scrollRef.current?.scrollTop ?? 0) <= 10) {
      setShowDownArrow(true);
    }

    if ( showDownArrow && (scrollRef.current?.scrollTop ?? 0) > 10) {
      setShowDownArrow(false);
    }
  }

  return (
    <Box ref={scrollRef} sx={{height: '100%', width: '100%', overflow: 'auto'}} onScroll={handleScroll}>

      <NavButton scrollRef={scrollRef} />

      {showDownArrow && <ScrollDownArrow scrollRef={scrollRef} titleRef={titleRef} />}
      
      {/* Title Seciton */}
      <ParallaxContainer imagePath={titleBackground} >
          <Box sx={{ ...title, ...centerContent, ...(isStickyTitle ? stickyTitle : nonStickyTitle), flexDirection: 'column'}} ref={titleRef}>
            <Grow in={true} timeout={1000}>
              <h1 id="title" style={{margin: 0, fontSize: isMobileView ? '4rem' : '7rem', textShadow: `0 1px ${CssConstants.darkGray}`}}>
                Winds Of Shadow
              </h1>
            </Grow>
            <Grow in={true} timeout={1000}>
              <p style={{position: "relative", fontSize: '3rem', margin: 0, textShadow: `0 1px ${CssConstants.darkGray}`}}>By Benjamin J Stegenga</p>
            </Grow>
          </Box>
      </ParallaxContainer>

      <ContentContainer>
        <AnimateWhenInView>
          <h2 id="about-the-book">About the Book</h2>
        </AnimateWhenInView>
        
        <GrowWhenInView threshold={isMobileView ? 0.33 : 0.75}>
          <p>A world hanging on the edge of chaos and darkness lies before Sean. One cold fateful night in the deep of winter a warrior named Taylor stumbles upon Sean alone in the mountains. Their meeting triggers Sean toward adventure in the world sprawled before him, one they must protect. At each step in the journey Sean faces task after task meeting Ancient’s and exploring the Southern Wasted Lands.</p>
        </GrowWhenInView>

        <GrowWhenInView threshold={isMobileView ? 0.33 : 0.75}>
          <p>It is here that Sean pieces together who exactly the Proclaimer of Light is; the person destined to tip the scale of an eternal struggle of good versus evil. Can Sean discover what it means to be Ancient and save the world? Joining the war of Light against Dark, Sean unlocks the shrouded mystery of the hero: Orwick Stormbringer.</p>
        </GrowWhenInView>

        <GrowWhenInView>
          <SocialMediaStack/>
        </GrowWhenInView>
      </ContentContainer>
      
      <ParallaxContainer imagePath={darkForest} style={{height: '300px', filter: 'brightness(0.75)'}} />

      <ContentContainer>

        <AnimateWhenInView>
          <h2 id="get-a-copy">Get a Copy</h2>
        </AnimateWhenInView>

        <GrowWhenInView threshold={0.5}>
          <Grid container spacing={2} sx={{padding: '2rem 0'}}>
            <Grid item sx={centerContent} md={6} xs={12}>
              <p>Buy Now on <a href={amazonUrl} target="_blank" rel="noreferrer" style={{color: '#007bff'}} >Amazon</a>!</p>
            </Grid>
            <Grid item sx={centerContent} md={6} xs={12}>
              <img src={bookCover} alt="Winds of Shadow book cover" />
            </Grid>
          </Grid>
        </GrowWhenInView>
      </ContentContainer>

      <ParallaxContainer imagePath={cavern} style={{height: '300px', filter: 'brightness(0.75)'}} />

      <ContentContainer>
        <AnimateWhenInView>
          <h2 id="about-the-author">About the Author</h2>
        </AnimateWhenInView>

        <GrowWhenInView threshold={0.1}>
          <Grid container spacing={2} >
            <Grid item sx={centerContent} lg={6} md={12} xs={12}>
              <Box sx={isMobileView ? photoCircle : {}}>
                <img src={authorPhoto} alt="Winds of Shadow author Benjamin J Stegenga" />
              </Box>
            </Grid>
            <Grid item sx={centerContent} lg={6} md={12} xs={12}>
              <Box sx={{...centerContent, flexDirection: 'column', textAlign: 'center'}}>
                <p>Benjamin J Stegenga</p>
                <p>
                  Born July 1991 in Lansing Michigan, Benjamin Stegenga grew up in the charming town of Portland Michigan. Exploring books as a child, fantasy fiction adventures took hold of his interests. Depths inside the pages opened up worlds to wonders built out of imagination. Classic novels were introduced in the high school years and implanted into Ben a slumbering desire to write. On a trip to Rome with family, Ben’s desire to write bloomed into a hobby crafting a world of his own.
                </p>
                <p>
                  Choosing to attend Ferris State University as a college freshman bound for nursing, Ben found out this was the wrong career path to pursue. Writing in the college English class Ben showed a strong voice to form opinions, even better a voice to breathe life in a story. Leaving the university after a single year Ben chose to find a new path in life away from the medical field. Working in customer service for a software company formed in Michigan Ben set upon making a career to pursue his hobby of writing.
                </p>
              </Box>
            </Grid>
            <Grid item sx={centerContent} lg={12} md={12} xs={12}>
              <Box sx={{...centerContent, flexDirection: 'column', textAlign: 'center'}}>
                <p>
                  Putting pen to paper in 2013 the framework to Winds of Shadow began to be placed; pure creation fueled Ben. Several years passed with work on the story being sporadic – some authors have the talent to draw but not Ben who chose to create a Minecraft map representing the world. Completing the first draft Memorial Day weekend 2017 marked a milestone of triumph and beginning to many edits with rewrites. In that time a single story turned into plans for several books to bring the full vision to life.
                </p>
                <p>
                  The support of friends and family helped Ben reach publication. Countless hours listening to plot ideas, reading early drafts and giving advice turned this dream into reality. Spending weekends going on trips camping, visiting other states and celebrating special occasions with family kept Ben grounded. With special assistance of his dog, Zelda, Ben enjoys to spend free days leading up to publication exploring nature to gain inspiration. The next story lurks on the other side of the horizon waiting to be discovered.
                </p>
                <p>
                  Ben still writes part time while working at the software company full time. Having a stable job during the pandemic of 2020, a time of uncertainty, gave Ben much needed perspective. It is also what gave Ben the opportunity to keep writing for fun and pushing the series forward. Using this last year to grow personally and as a writer to create hope.
                </p>
                <p>
                  The hope is all readers enjoy the story told and become ensnared in the characters’ adventures. Formulate theories to where the next book leads and maybe it will inspire an idea to write a story - a story exists in every person waiting to be written.
                </p>
                <p/>
                <p>Happy Reading!</p>
                <p>Benjamin J. Stegenga</p>
              </Box>
            </Grid>
          </Grid>
        </GrowWhenInView>
      </ContentContainer>

      <Box sx={{color: 'white', textAlign: 'center'}}>
        <p>Copyright © BenjaminJStegenga. All rights reserved.</p>
      </Box>
    </Box>
  )
}

export default App;
