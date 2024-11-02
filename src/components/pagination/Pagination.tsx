import { FC } from 'react';
import { Button } from '../ui/button/Button.tsx';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageClick = (page: number) => page !== currentPage && onPageChange(page);

	const renderPageButton = (page: number) => (
		<Button
			key={page}
			size="sm"
			variant="default"
			className={currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}
			onClick={() => handlePageClick(page)}
		>
			{page}
		</Button>
	);

	const renderPageNumbers = () => {
		const pages = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(renderPageButton(i));
		} else {
			pages.push(renderPageButton(1));

			if (currentPage > 3) pages.push(<span key="dots-left">...</span>);

			const startPage = Math.max(2, currentPage - 1);
			const endPage = Math.min(totalPages - 1, currentPage + 1);

			for (let i = startPage; i <= endPage; i++) pages.push(renderPageButton(i));

			if (currentPage < totalPages - 2) pages.push(<span key="dots-right">...</span>);

			pages.push(renderPageButton(totalPages));
		}
		return pages;
	};

	return (
		<div className="flex justify-center mt-4">
			<Button
				variant="default"
				className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Назад
			</Button>
			{renderPageNumbers()}
			<Button
				variant="default"
				className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
				onClick={() => handlePageClick(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Вперед
			</Button>
		</div>
	);
};

export default Pagination;
