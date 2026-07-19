import { useState } from 'react';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import { FetchNotes } from '../../services/noteService';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';

export default function App() {
  const [topic, setTopic] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  // HTTP Request
  const handleSearch = useDebouncedCallback(() => { (setCurrentPage(1), setTopic)}, 500);
  
  const { data } = useQuery({
    queryKey: ['notes', topic, currentPage],
    queryFn: () => FetchNotes(topic, currentPage),
    placeholderData: keepPreviousData,
  });
  /////////////////////////////////////////////////////
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  ////////////////////////////////////////////////
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox query={topic} onSearch={handleSearch}/>
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              changePage={setCurrentPage}
              totalPages={data.totalPages}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create Task
          </button>
        </header>
        {isModalOpen && (
          <Modal>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}
