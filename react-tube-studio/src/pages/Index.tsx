import React, { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryChips from '../components/CategoryChips';
import VideoGrid from '../components/VideoGrid';
import { mockVideos } from '../data/mockVideos';

const Index: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const filteredVideos = useMemo(() => {
    let videos = mockVideos;
    
    // Filter by search
    if (activeSearch) {
      const query = activeSearch.toLowerCase();
      videos = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.channel.name.toLowerCase().includes(query)
      );
    }
    
    // Filter by category (simplified - in real app would use actual categories)
    if (selectedCategory !== 'All') {
      // For demo, we'll just shuffle based on category
      videos = [...videos].sort(() => Math.random() - 0.5);
    }
    
    return videos;
  }, [selectedCategory, activeSearch]);

  const handleSearch = () => {
    setActiveSearch(searchQuery);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'hsl(var(--background))' }}>
      <Navbar 
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          transition: 'margin 0.2s ease',
          ml: { xs: 0, md: sidebarOpen ? '240px' : 0 },
        }}
      >
        <CategoryChips 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <VideoGrid videos={filteredVideos} />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
