import { Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { CssConstants } from '../constants/CssConstants';

const NavButton: React.FC<INavButtonProps> = ({scrollRef}) => {
  const isMobileView = useMediaQuery(`(max-width:${CssConstants.mobileBreakpoint})`);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuItemClick = (elementId: string) => {
    const element = document.getElementById(elementId);
    console.log(element?.offsetTop)
    scrollRef?.current?.scrollTo({left: 0, top: element?.offsetTop ?? 0, behavior: "smooth"});
    handleMenuClose();
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{position: 'absolute', right: isMobileView ? '1.25rem' : '1.75rem', background: CssConstants.darkGray, zIndex: 1, top: '0.5rem', boxShadow: 3, borderRadius: '0.5rem'}}>
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
  );
};

export interface INavButtonProps {
   scrollRef: React.RefObject<HTMLDivElement>
}

export default NavButton;