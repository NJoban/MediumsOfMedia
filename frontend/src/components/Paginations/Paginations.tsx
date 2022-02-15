import React from 'react'
import { Pagination } from 'react-bootstrap';
import { scrollToTop } from '../../Assets/Helpers/Scroll';

interface PaginationsProps {
    // itemCount: Number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pageCount: number;
    paginiationCheck: boolean;
}

const Paginations = ({ currentPage, pageCount, setCurrentPage, paginiationCheck }: PaginationsProps) => {
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pageCount;

    const changePage = (pageNumber: any) => {
        if (currentPage === pageNumber) return;
        setCurrentPage(pageNumber);
        scrollToTop();
    };

    const onPageNumberClick = (pageNumber: number) => {
        changePage(pageNumber);
    };

    const onPreviousPageClick = () => {
        changePage((currentPage: number) => currentPage - 1);

    };

    const onNextPageClick = () => {
        changePage((currentPage: number) => currentPage + 1);

    };

    const setLastPageAsCurrent = () => {
        if (typeof currentPage != "undefined" && currentPage > pageCount) {
            setCurrentPage(pageCount);
        }
    };
    let isPageNumberOutOfRange: boolean;

    const pageNumbers = [...new Array(pageCount)].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pageCount;
        const isCurrentPageWithinTwoPageNumbers =
            Math.abs(pageNumber - currentPage) <= 2;

        if (
            isPageNumberFirst ||
            isPageNumberLast ||
            isCurrentPageWithinTwoPageNumbers
        ) {
            isPageNumberOutOfRange = false;
            return (
                <>
                    {paginiationCheck && (
                        <Pagination.Item
                            key={pageNumber}
                            onClick={() => onPageNumberClick(pageNumber)}
                            active={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    )}

                </>
            );
        }
        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <Pagination.Ellipsis key={pageNumber} className="muted" />;
        }

        return null;
    })

    return (
        <>
            <Pagination>
                <Pagination.Prev
                    onClick={onPreviousPageClick}
                    disabled={isCurrentPageFirst}
                />
                {pageNumbers}
                <Pagination.Next
                    onClick={onNextPageClick}
                    disabled={isCurrentPageLast}
                />
            </Pagination>
        </>
    );
}

export default Paginations