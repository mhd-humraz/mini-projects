import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShareIcon from '@mui/icons-material/Share';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockVideos';

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const video = useMemo(() => {
    return mockVideos.find((v) => v.id === id);
  }, [id]);

  const relatedVideos = useMemo(() => {
    return mockVideos.filter((v) => v.id !== id).slice(0, 8);
  }, [id]);

  const handleSearch = () => {
    // Navigate to home with search query
    window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
  };

  if (!video) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          bgcolor: 'hsl(var(--background))',
        }}
      >
        <Typography variant="h5" sx={{ color: 'hsl(var(--foreground))' }}>
          Video not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'hsl(var(--background))' }}>
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 9,
          px: { xs: 0, md: 3 },
          pb: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 3,
            maxWidth: 1800,
            mx: 'auto',
          }}
        >
          {/* Main content */}
          <Box sx={{ flex: 1, maxWidth: { lg: 'calc(100% - 420px)' } }}>
            {/* Video player */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                bgcolor: 'black',
                borderRadius: { xs: 0, md: '12px' },
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={video.thumbnail}
                alt={video.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Play button overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 68,
                  height: 48,
                  bgcolor: 'hsl(var(--youtube-red))',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'hsl(0, 100%, 45%)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 0,
                    height: 0,
                    borderLeft: '18px solid white',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    ml: 1,
                  }}
                />
              </Box>
            </Box>

            {/* Video info */}
            <Box sx={{ px: { xs: 2, md: 0 }, mt: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'hsl(var(--foreground))',
                  lineHeight: 1.4,
                }}
              >
                {video.title}
              </Typography>

              {/* Channel info and actions */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: 'space-between',
                  gap: 2,
                  mt: 2,
                }}
              >
                {/* Channel */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    src={video.channel.avatar}
                    alt={video.channel.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: 'hsl(var(--foreground))',
                        fontSize: 16,
                      }}
                    >
                      {video.channel.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'hsl(var(--muted-foreground))',
                        fontSize: 12,
                      }}
                    >
                      {video.channel.subscribers} subscribers
                    </Typography>
                  </Box>
                  <Button
                    variant={isSubscribed ? 'outlined' : 'contained'}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    sx={{
                      ml: 2,
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 500,
                      bgcolor: isSubscribed ? 'transparent' : 'hsl(var(--foreground))',
                      color: isSubscribed ? 'hsl(var(--foreground))' : 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      '&:hover': {
                        bgcolor: isSubscribed ? 'hsl(var(--secondary))' : 'hsl(var(--foreground))',
                        opacity: 0.9,
                      },
                    }}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </Box>

                {/* Action buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: 'hsl(var(--secondary))',
                      borderRadius: '20px',
                      overflow: 'hidden',
                    }}
                  >
                    <Button
                      startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                      onClick={() => setIsLiked(!isLiked)}
                      sx={{
                        color: 'hsl(var(--foreground))',
                        textTransform: 'none',
                        px: 2,
                        '&:hover': {
                          bgcolor: 'hsl(var(--youtube-hover))',
                        },
                      }}
                    >
                      2.4K
                    </Button>
                    <Divider orientation="vertical" flexItem sx={{ borderColor: 'hsl(var(--border))' }} />
                    <IconButton sx={{ color: 'hsl(var(--foreground))', px: 2 }}>
                      <ThumbDownOutlinedIcon />
                    </IconButton>
                  </Box>

                  <Button
                    startIcon={<ShareIcon />}
                    sx={{
                      bgcolor: 'hsl(var(--secondary))',
                      color: 'hsl(var(--foreground))',
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 2,
                      '&:hover': {
                        bgcolor: 'hsl(var(--youtube-hover))',
                      },
                    }}
                  >
                    Share
                  </Button>

                  <Button
                    startIcon={<PlaylistAddIcon />}
                    sx={{
                      bgcolor: 'hsl(var(--secondary))',
                      color: 'hsl(var(--foreground))',
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 2,
                      display: { xs: 'none', sm: 'flex' },
                      '&:hover': {
                        bgcolor: 'hsl(var(--youtube-hover))',
                      },
                    }}
                  >
                    Save
                  </Button>

                  <IconButton
                    sx={{
                      bgcolor: 'hsl(var(--secondary))',
                      color: 'hsl(var(--foreground))',
                      '&:hover': {
                        bgcolor: 'hsl(var(--youtube-hover))',
                      },
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Description */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'hsl(var(--secondary))',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: 'hsl(var(--foreground))',
                      fontSize: 14,
                    }}
                  >
                    {video.views}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: 'hsl(var(--foreground))',
                      fontSize: 14,
                    }}
                  >
                    {video.uploadedAt}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: 'hsl(var(--foreground))',
                    fontSize: 14,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: showFullDescription ? 'unset' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {video.description}
                </Typography>
                {!showFullDescription && (
                  <Typography
                    sx={{
                      mt: 1,
                      fontWeight: 500,
                      color: 'hsl(var(--foreground))',
                      fontSize: 14,
                    }}
                  >
                    ...more
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Related videos */}
          <Box
            sx={{
              width: { xs: '100%', lg: 400 },
              px: { xs: 2, lg: 0 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                color: 'hsl(var(--foreground))',
                mb: 2,
                display: { xs: 'block', lg: 'none' },
              }}
            >
              Related videos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {relatedVideos.map((relatedVideo) => (
                <Link
                  key={relatedVideo.id}
                  to={`/video/${relatedVideo.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      cursor: 'pointer',
                      '&:hover': {
                        '& .video-title': {
                          color: 'hsl(var(--foreground))',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: 168,
                        minWidth: 168,
                        aspectRatio: '16/9',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        bgcolor: 'hsl(var(--muted))',
                      }}
                    >
                      <Box
                        component="img"
                        src={relatedVideo.thumbnail}
                        alt={relatedVideo.title}
                        loading="lazy"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 4,
                          right: 4,
                          bgcolor: 'rgba(0, 0, 0, 0.8)',
                          color: 'white',
                          px: 0.5,
                          py: 0.25,
                          borderRadius: '4px',
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {relatedVideo.duration}
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                      <Typography
                        className="video-title"
                        sx={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: 'hsl(var(--foreground))',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 0.5,
                        }}
                      >
                        {relatedVideo.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {relatedVideo.channel.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {relatedVideo.views} • {relatedVideo.uploadedAt}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
