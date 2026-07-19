import css from './Pagination.module.css';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';

type ModuleWithDefault<T> = { default: T };

interface PaginationProps {
  currentPage: number;
  changePage: (currentPage: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  changePage,
  totalPages,
}: PaginationProps) {
  const ReactPaginate = (
    ReactPaginateModule as unknown as ModuleWithDefault<
      ComponentType<ReactPaginateProps>
    >
  ).default;


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
        forcePage={currentPage - 1}
      />
    </>
  );
}
