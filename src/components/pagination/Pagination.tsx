import { Button } from '../ui/button/Button.tsx';
import { ReactNode } from 'react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const handlePageClick = (page: number) => {
        if (page !== currentPage && page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageButton = (page: number) => (
        <Button
            key={page}
            size='sm'
            variant='ghost'
            className={`${currentPage === page ? 'bg-blue-500 text-white hover:bg-blue-500 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            onClick={() => handlePageClick(page)}
        >
            {page}
        </Button>
    );

    const renderEllipsis = (key: string) => (
        <span key={key} className='px-2'>
            ...
        </span>
    );

    const renderPageNumbers = () => {
        const pages: ReactNode[] = [];
        const showEllipsis = totalPages > 5;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(renderPageButton(i));
            }
        } else {
            pages.push(renderPageButton(1));

            if (currentPage > 3) pages.push(renderEllipsis('left'));

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(renderPageButton(i));
            }

            if (currentPage < totalPages - 2) pages.push(renderEllipsis('right'));

            pages.push(renderPageButton(totalPages));
        }

        return pages;
    };

    return (
        <div className='flex justify-center items-center space-x-1 mt-4'>
            <Button
                variant='ghost'
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                }`}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Назад
            </Button>
            {renderPageNumbers()}
            <Button
                variant='ghost'
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                }`}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Вперед
            </Button>
        </div>
    );
};

export default Pagination;
