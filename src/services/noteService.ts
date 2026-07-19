import axios from 'axios';
import type { Note } from '../types/note';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function FetchNotes(
  query: string = '',
  currentPage: number
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes/`,
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

interface CreatedNote {
  title: string;
  content: string | null;
  tag: string;
}

export async function createNote(newNote: CreatedNote):Promise<Note> {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes/',
    newNote,{
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(taskId: string):Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${taskId}`,
    {headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}
