
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Note } from './types';
import { analyzeNoteContent } from './services/geminiService';
import { NoteCard } from './components/NoteCard';
import { SunIcon, MoonIcon, SearchIcon, DownloadIcon, CopyIcon } from './components/Icons';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('smart-notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
    const storedTheme = localStorage.getItem('smart-notes-theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('smart-notes', JSON.stringify(notes));
  }, [notes]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('smart-notes-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('smart-notes-theme', 'light');
      }
      return newMode;
    });
  };

  const handleSaveNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please enter a title and content for your note.');
      return;
    }
    setIsLoading(true);

    try {
      const analysis = await analyzeNoteContent(title, content);
      const now = Date.now();

      if (editingNoteId) {
        setNotes(notes.map(note => 
          note.id === editingNoteId
            ? { ...note, title, content, ...analysis, updatedAt: now }
            : note
        ));
      } else {
        const newNote: Note = {
          id: `note-${now}`,
          title,
          content,
          ...analysis,
          pinned: false,
          createdAt: now,
          updatedAt: now,
        };
        setNotes([newNote, ...notes]);
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("There was an error saving your note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingNoteId(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
      if (id === editingNoteId) {
        resetForm();
      }
    }
  };

  const handleTogglePin = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };
  
  const downloadNotes = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "smart_notes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }, [notes]);

  const copyNotesToClipboard = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(notes, null, 2)).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    }, () => {
      setCopyStatus('Failed!');
      setTimeout(() => setCopyStatus(''), 2000);
    });
  }, [notes]);


  const filteredAndSortedNotes = useMemo(() => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return b.createdAt - a.createdAt;
      }
      return a.createdAt - b.createdAt;
    });
    
    const pinned = filtered.filter(note => note.pinned);
    const unpinned = filtered.filter(note => !note.pinned);

    return { pinned, unpinned };
  }, [notes, searchTerm, sortBy]);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Smart Notes</h1>
          <div className="flex items-center space-x-4">
            <div className="relative w-48 sm:w-64">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">{editingNoteId ? 'Edit Note' : 'Add a New Note'}</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <textarea
              placeholder="Note Content (Markdown supported)"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleSaveNote}
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center transition"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (editingNoteId ? 'Update Note' : 'Save Note')}
            </button>
            {editingNoteId && (
              <button onClick={resetForm} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
                <label htmlFor="sort-by" className="font-medium">Sort by:</label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')}
                    className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={downloadNotes} className="flex items-center gap-2 px-4 py-2 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition">
                    <DownloadIcon className="w-4 h-4" /> Download JSON
                </button>
                <button onClick={copyNotesToClipboard} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition w-32 justify-center">
                    {copyStatus ? copyStatus : <><CopyIcon className="w-4 h-4" /> Copy JSON</>}
                </button>
            </div>
        </div>
        
        {filteredAndSortedNotes.pinned.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-indigo-500/50 pb-2">Pinned Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedNotes.pinned.map(note => (
                <NoteCard key={note.id} note={note} searchTerm={searchTerm} onEdit={handleEdit} onDelete={handleDelete} onTogglePin={handleTogglePin} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-500/50 pb-2">All Notes</h2>
          {filteredAndSortedNotes.unpinned.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedNotes.unpinned.map(note => (
                <NoteCard key={note.id} note={note} searchTerm={searchTerm} onEdit={handleEdit} onDelete={handleDelete} onTogglePin={handleTogglePin} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                {notes.length > 0 ? 'No notes match your search.' : 'No notes yet. Add one to get started!'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
