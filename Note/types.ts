
export type Mood = 'positive' | 'neutral' | 'thoughtful';

export interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  mood: Mood;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
}
