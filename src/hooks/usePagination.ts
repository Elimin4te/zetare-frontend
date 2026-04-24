import { useState } from 'react';

// ==============================|| HOOKS - PAGINATION ||============================== //

export default function usePagination(data: any, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage: number) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage: number) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    // When data is empty, maxPage is 0 — avoid setting currentPage to 0 (causes empty slice on first load)
    const safeMaxPage = Math.max(1, maxPage);
    setCurrentPage(() => Math.min(pageNumber, safeMaxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}
