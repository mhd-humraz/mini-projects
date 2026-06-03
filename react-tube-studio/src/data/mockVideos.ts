export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: {
    name: string;
    avatar: string;
    subscribers: string;
  };
  views: string;
  uploadedAt: string;
  duration: string;
  description: string;
  videoUrl: string;
}

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "Building a Modern React Application from Scratch - Complete Tutorial 2024",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=720&h=404&fit=crop",
    channel: {
      name: "CodeMaster Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=88&h=88&fit=crop&crop=face",
      subscribers: "1.2M",
    },
    views: "2.4M views",
    uploadedAt: "2 weeks ago",
    duration: "45:32",
    description: "Learn how to build a complete React application from scratch. We cover components, hooks, state management, and more!",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "The Future of AI: What to Expect in 2024 and Beyond",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=720&h=404&fit=crop",
    channel: {
      name: "Tech Insights",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=88&h=88&fit=crop&crop=face",
      subscribers: "890K",
    },
    views: "1.8M views",
    uploadedAt: "5 days ago",
    duration: "28:15",
    description: "Exploring the latest developments in artificial intelligence and what the future holds for this transformative technology.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "10 JavaScript Tips Every Developer Should Know",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=720&h=404&fit=crop",
    channel: {
      name: "Dev Simplified",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=88&h=88&fit=crop&crop=face",
      subscribers: "2.1M",
    },
    views: "890K views",
    uploadedAt: "1 month ago",
    duration: "18:45",
    description: "Master these essential JavaScript tips to level up your coding skills and write cleaner, more efficient code.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Epic Mountain Hiking Adventure - 4K Cinematic",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=720&h=404&fit=crop",
    channel: {
      name: "Adventure Awaits",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop&crop=face",
      subscribers: "3.4M",
    },
    views: "5.2M views",
    uploadedAt: "3 months ago",
    duration: "52:18",
    description: "Join us on an incredible journey through some of the world's most breathtaking mountain landscapes.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Cooking the Perfect Italian Pasta - Authentic Recipe",
    thumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=720&h=404&fit=crop",
    channel: {
      name: "Chef's Kitchen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=88&h=88&fit=crop&crop=face",
      subscribers: "4.7M",
    },
    views: "3.1M views",
    uploadedAt: "1 week ago",
    duration: "22:30",
    description: "Learn the secrets to making restaurant-quality Italian pasta right in your own kitchen.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Understanding TypeScript: A Complete Guide for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=720&h=404&fit=crop",
    channel: {
      name: "Code Academy",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=88&h=88&fit=crop&crop=face",
      subscribers: "1.5M",
    },
    views: "720K views",
    uploadedAt: "2 months ago",
    duration: "1:15:42",
    description: "Everything you need to know about TypeScript - from basic types to advanced patterns.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "7",
    title: "Relaxing Piano Music for Studying and Focus",
    thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=720&h=404&fit=crop",
    channel: {
      name: "Peaceful Melodies",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=88&h=88&fit=crop&crop=face",
      subscribers: "8.2M",
    },
    views: "15M views",
    uploadedAt: "6 months ago",
    duration: "3:00:00",
    description: "3 hours of calming piano music perfect for studying, working, or relaxing.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "8",
    title: "How to Start a Successful Online Business in 2024",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&h=404&fit=crop",
    channel: {
      name: "Business Mastery",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=88&h=88&fit=crop&crop=face",
      subscribers: "2.8M",
    },
    views: "1.1M views",
    uploadedAt: "3 weeks ago",
    duration: "38:22",
    description: "Step-by-step guide to launching your own profitable online business from scratch.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "9",
    title: "Street Photography Tips: Capture Amazing Urban Shots",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=720&h=404&fit=crop",
    channel: {
      name: "Photo Pro",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=88&h=88&fit=crop&crop=face",
      subscribers: "950K",
    },
    views: "445K views",
    uploadedAt: "4 days ago",
    duration: "16:48",
    description: "Master the art of street photography with these professional tips and techniques.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "10",
    title: "Full Body Workout - No Equipment Needed (30 Minutes)",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=720&h=404&fit=crop",
    channel: {
      name: "Fitness First",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=88&h=88&fit=crop&crop=face",
      subscribers: "5.6M",
    },
    views: "8.9M views",
    uploadedAt: "2 months ago",
    duration: "32:15",
    description: "Get fit at home with this intense full body workout that requires no equipment.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "11",
    title: "CSS Grid and Flexbox - The Ultimate Layout Guide",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=720&h=404&fit=crop",
    channel: {
      name: "WebDev Pro",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=88&h=88&fit=crop&crop=face",
      subscribers: "1.8M",
    },
    views: "1.3M views",
    uploadedAt: "1 month ago",
    duration: "55:20",
    description: "Master CSS layouts with this comprehensive guide to Grid and Flexbox.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "12",
    title: "Top 10 Travel Destinations for 2024",
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=720&h=404&fit=crop",
    channel: {
      name: "Travel Explorer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=88&h=88&fit=crop&crop=face",
      subscribers: "4.2M",
    },
    views: "2.7M views",
    uploadedAt: "1 week ago",
    duration: "24:55",
    description: "Discover the most amazing places to visit this year - from hidden gems to popular hotspots.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Cooking",
  "Recently uploaded",
  "Watched",
  "New to you",
  "Programming",
  "Comedy",
  "Sports",
  "Technology",
  "Education",
];
