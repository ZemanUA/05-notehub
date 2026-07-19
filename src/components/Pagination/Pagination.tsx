import css from './Pagination.module.css';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import type { NoteTag } from '../../types/Note';

type ModuleWithDefault<T> = { default: T };

interface PaginationProps {
  page: number;
  changePage: (page: number) => void;
  dataInfo: NoteTag;
}

export default function Pagination({
  page,
  changePage,
  dataInfo,
}: PaginationProps) {
  const ReactPaginate = (
    ReactPaginateModule as unknown as ModuleWithDefault<
      ComponentType<ReactPaginateProps>
    >
  ).default;

  const totalPages = dataInfo?.totalPages ?? 0;

  return (
    <>
      <ReactPaginate
        className={css.pagination}
        pageCount={totalPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={0}
        previousLabel={'<-'}
        nextLabel={'->'}
        onPageChange={({ selected }) => changePage(selected + 1)}
        forcePage={page - 1}
      />
    </>
  );
}
