import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const mainMenuItems = [
  { icon: <HomeIcon />, label: 'Home', path: '/' },
  { icon: <ExploreIcon />, label: 'Explore', path: '/explore' },
  { icon: <SubscriptionsIcon />, label: 'Subscriptions', path: '/subscriptions' },
];

const libraryItems = [
  { icon: <VideoLibraryIcon />, label: 'Library', path: '/library' },
  { icon: <HistoryIcon />, label: 'History', path: '/history' },
  { icon: <PlaylistPlayIcon />, label: 'Your videos', path: '/your-videos' },
  { icon: <WatchLaterIcon />, label: 'Watch later', path: '/watch-later' },
  { icon: <ThumbUpIcon />, label: 'Liked videos', path: '/liked' },
];

const exploreItems = [
  { icon: <WhatshotIcon />, label: 'Trending', path: '/trending' },
  { icon: <MusicNoteIcon />, label: 'Music', path: '/music' },
  { icon: <SportsEsportsIcon />, label: 'Gaming', path: '/gaming' },
  { icon: <NewspaperIcon />, label: 'News', path: '/news' },
  { icon: <EmojiEventsIcon />, label: 'Sports', path: '/sports' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const drawerWidth = 240;

  const renderMenuItem = (item: { icon: React.ReactNode; label: string; path: string }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <ListItemButton
        key={item.label}
        component={Link}
        to={item.path}
        onClick={isMobile ? onClose : undefined}
        sx={{
          borderRadius: '10px',
          mx: 1,
          mb: 0.5,
          bgcolor: isActive ? 'hsl(var(--secondary))' : 'transparent',
          '&:hover': {
            bgcolor: 'hsl(var(--youtube-hover))',
          },
        }}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: 40,
            color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.label}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: isActive ? 500 : 400,
            color: 'hsl(var(--foreground))',
          }}
        />
      </ListItemButton>
    );
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', py: 1 }}>
      <List>
        {mainMenuItems.map(renderMenuItem)}
      </List>
      
      <Divider sx={{ my: 1, borderColor: 'hsl(var(--border))' }} />
      
      <List>
        {libraryItems.map(renderMenuItem)}
      </List>
      
      <Divider sx={{ my: 1, borderColor: 'hsl(var(--border))' }} />
      
      <Box sx={{ px: 3, py: 1 }}>
        <Box 
          component="span" 
          sx={{ 
            fontSize: 14, 
            fontWeight: 500,
            color: 'hsl(var(--foreground))',
          }}
        >
          Explore
        </Box>
      </Box>
      <List>
        {exploreItems.map(renderMenuItem)}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: 'hsl(var(--background))',
            borderRight: '1px solid hsl(var(--border))',
            pt: 8,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'hsl(var(--background))',
          borderRight: '1px solid hsl(var(--border))',
          pt: 8,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
