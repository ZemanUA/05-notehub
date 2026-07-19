import axios from 'axios';
import type { Note, NoteTag } from '../types/Note.ts';

export async function FetchNotes(
  query: string = '',
  currentPage: number
): Promise<NoteTag> {
  const response = await axios.get<NoteTag>(
    `https://notehub-public.goit.study/api/notes?`,
    {
      params: {
        search: query,
        page: currentPage,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

interface createdNote {
  title: string;
  content: string;
  tag: string;
}

export async function createTask(newNote: createdNote) {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes?',
    newNote,{
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteTask(taskId: string) {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes?${taskId}`
  );
  return response.data;
}
