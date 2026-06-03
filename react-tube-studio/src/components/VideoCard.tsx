import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, Typography, Tooltip } from '@mui/material';
import { Video } from '../data/mockVideos';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link 
      to={`/video/${video.id}`} 
      style={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          animation: 'fade-in 0.3s ease-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        {/* Thumbnail */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '12px',
            overflow: 'hidden',
            bgcolor: 'hsl(var(--muted))',
          }}
        >
          <Box
            component="img"
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Duration badge */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              px: 0.75,
              py: 0.25,
              borderRadius: '4px',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {video.duration}
          </Box>
        </Box>

        {/* Video info */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
          <Avatar
            src={video.channel.avatar}
            alt={video.channel.name}
            sx={{ width: 36, height: 36, mt: 0.5 }}
          />
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Tooltip title={video.title} placement="top-start">
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'hsl(var(--foreground))',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  mb: 0.5,
                }}
              >
                {video.title}
              </Typography>
            </Tooltip>
            <Typography
              sx={{
                fontSize: 13,
                color: 'hsl(var(--muted-foreground))',
                '&:hover': {
                  color: 'hsl(var(--foreground))',
                },
              }}
            >
              {video.channel.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: 'hsl(var(--muted-foreground))',
              }}
            >
              {video.views} • {video.uploadedAt}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default VideoCard;
