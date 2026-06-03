import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Badge,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearIcon from '@mui/icons-material/Clear';

interface NavbarProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onMenuClick, 
  searchQuery, 
  onSearchChange,
  onSearch 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  if (isMobile && showMobileSearch) {
    return (
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'hsl(var(--background))', 
          boxShadow: 'none',
          borderBottom: '1px solid hsl(var(--border))',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton onClick={() => setShowMobileSearch(false)}>
            <ClearIcon sx={{ color: 'hsl(var(--foreground))' }} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              bgcolor: 'hsl(var(--secondary))',
              borderRadius: '40px',
              px: 2,
            }}
          >
            <InputBase
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              sx={{ 
                flex: 1, 
                py: 1,
                color: 'hsl(var(--foreground))',
                '& input::placeholder': {
                  color: 'hsl(var(--muted-foreground))',
                },
              }}
            />
            <IconButton onClick={onSearch}>
              <SearchIcon sx={{ color: 'hsl(var(--foreground))' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'hsl(var(--background))', 
        boxShadow: 'none',
        borderBottom: '1px solid hsl(var(--border))',
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            edge="start" 
            onClick={onMenuClick}
            sx={{ color: 'hsl(var(--foreground))' }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box
              component="svg"
              viewBox="0 0 90 20"
              sx={{ height: 20, width: 'auto' }}
            >
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 140 20"
  height="20"
>
  {/* Red play button */}
  <path
    fill="hsl(0, 100%, 50%)"
    d="M27.973 0H2.637C1.18 0 0 1.18 0 2.637v14.726C0 18.82 1.18 20 2.637 20h25.336c1.457 0 2.637-1.18 2.637-2.637V2.637C30.61 1.18 29.43 0 27.973 0z"
  />

  {/* Play icon */}
  <path
    fill="#fff"
    d="M12.25 14.494V5.506L20.125 10l-7.875 4.494z"
  />

  {/* ViewTube text - BLACK */}
  <text
    x="40"
    y="15"
    fill="#000"
    fontSize="14"
    fontWeight="600"
    fontFamily="Arial, Helvetica, sans-serif"
    letterSpacing="0.5"
  >
    ViewTube
  </text>
</svg>

            </Box>
          </Link>
        </Box>

        {/* Center section - Search */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 640, mx: 'auto' }}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                border: '1px solid hsl(var(--border))',
                borderRadius: '40px 0 0 40px',
                pl: 2,
                '&:focus-within': {
                  borderColor: 'hsl(var(--ring))',
                },
              }}
            >
              <InputBase
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ 
                  flex: 1, 
                  py: 1,
                  color: 'hsl(var(--foreground))',
                  '& input::placeholder': {
                    color: 'hsl(var(--muted-foreground))',
                  },
                }}
              />
            </Box>
            <Box
              onClick={onSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 40,
                bgcolor: 'hsl(var(--secondary))',
                borderRadius: '0 40px 40px 0',
                border: '1px solid hsl(var(--border))',
                borderLeft: 'none',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'hsl(var(--youtube-hover))',
                },
              }}
            >
              <SearchIcon sx={{ color: 'hsl(var(--foreground))' }} />
            </Box>
            <Tooltip title="Search with your voice">
              <IconButton 
                sx={{ 
                  ml: 1, 
                  bgcolor: 'hsl(var(--secondary))',
                  '&:hover': {
                    bgcolor: 'hsl(var(--youtube-hover))',
                  },
                }}
              >
                <MicIcon sx={{ color: 'hsl(var(--foreground))' }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Right section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={() => setShowMobileSearch(true)}>
              <SearchIcon sx={{ color: 'hsl(var(--foreground))' }} />
            </IconButton>
          )}
          {!isMobile && (
            <Tooltip title="Create">
              <IconButton sx={{ color: 'hsl(var(--foreground))' }}>
                <VideoCallIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: 'hsl(var(--foreground))' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton sx={{ p: 0.5 }}>
            <Avatar 
              sx={{ width: 32, height: 32 }}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=88&h=88&fit=crop&crop=face"
              alt="User"
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
