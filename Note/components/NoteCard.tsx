
import React from 'react';
import { Note, Mood } from '../types';
import { PinIcon, EditIcon, DeleteIcon } from './Icons';
import ReactMarkdown from 'react-markdown';

interface NoteCardProps {
  note: Note;
  searchTerm: string;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const moodStyles: { [key in Mood]: { bg: string; text: string; emoji: string } } = {
  positive: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200', emoji: '😊' },
  neutral: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-200', emoji: '😐' },
  thoughtful: { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-200', emoji: '🤔' },
};

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300 dark:bg-yellow-500 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, searchTerm, onEdit, onDelete, onTogglePin }) => {
  const { bg, text, emoji } = moodStyles[note.mood] || moodStyles.neutral;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white pr-2">
            <HighlightedText text={note.title} highlight={searchTerm} />
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTogglePin(note.id)}
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                note.pinned
                  ? 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900'
                  : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={note.pinned ? 'Unpin Note' : 'Pin Note'}
            >
              <PinIcon className="w-5 h-5" filled={note.pinned} />
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm italic">
           <HighlightedText text={note.summary} highlight={searchTerm} />
        </p>
        <div className="prose prose-sm dark:prose-invert max-w-none mb-4 text-gray-700 dark:text-gray-200">
            <ReactMarkdown>{note.content.substring(0, 200) + (note.content.length > 200 ? '...' : '')}</ReactMarkdown>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map(tag => (
            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${bg} ${text}`}>
            {emoji} {note.mood.charAt(0).toUpperCase() + note.mood.slice(1)}
          </span>
          <div className="flex items-center space-x-2">
            <button onClick={() => onEdit(note)} className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" title="Edit Note">
              <EditIcon className="w-5 h-5" />
            </button>
            <button onClick={() => onDelete(note.id)} className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors" title="Delete Note">
              <DeleteIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
