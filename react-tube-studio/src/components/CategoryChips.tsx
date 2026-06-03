import React, { useRef } from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { categories } from '../data/mockVideos';

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 64,
        zIndex: 100,
        bgcolor: 'hsl(var(--background))',
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <IconButton
        onClick={() => scroll('left')}
        sx={{
          display: { xs: 'none', md: 'flex' },
          bgcolor: 'hsl(var(--background))',
          boxShadow: '4px 0 8px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: 'hsl(var(--secondary))',
          },
        }}
        size="small"
      >
        <ChevronLeftIcon sx={{ color: 'hsl(var(--foreground))' }} />
      </IconButton>

      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          flex: 1,
          px: { xs: 2, md: 0 },
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => onSelectCategory(category)}
            sx={{
              bgcolor: selectedCategory === category 
                ? 'hsl(var(--foreground))' 
                : 'hsl(var(--secondary))',
              color: selectedCategory === category 
                ? 'hsl(var(--background))' 
                : 'hsl(var(--foreground))',
              fontWeight: 500,
              fontSize: 14,
              borderRadius: '8px',
              px: 0.5,
              '&:hover': {
                bgcolor: selectedCategory === category 
                  ? 'hsl(var(--foreground))' 
                  : 'hsl(var(--youtube-hover))',
              },
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      <IconButton
        onClick={() => scroll('right')}
        sx={{
          display: { xs: 'none', md: 'flex' },
          bgcolor: 'hsl(var(--background))',
          boxShadow: '-4px 0 8px rgba(0,0,0,0.1)',
          '&:hover': {
            bgcolor: 'hsl(var(--secondary))',
          },
        }}
        size="small"
      >
        <ChevronRightIcon sx={{ color: 'hsl(var(--foreground))' }} />
      </IconButton>
    </Box>
  );
};

export default CategoryChips;
