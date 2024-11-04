import { FC } from 'react';
import { Button } from '../ui/button/Button.tsx';
import Skeleton from '../ui/skeleton/Skeleton.tsx';

export type CoinContentProps = {
	isLoading: boolean;
	isError: boolean;
	handelBack: () => void;
	coin: {
		formattedPriceUsd: string;
		formattedMarketCapUsd: string;
		formattedMaxSupply: string;
		formattedSupply: string;
		rank: number;
		name: string;
		symbol: string;
	};
	handleModalOpen: () => void;
}

const CoinContent: FC<CoinContentProps> = ({
											   isLoading,
											   isError,
											   handelBack,
											   coin: {
												   name,
												   symbol,
												   formattedPriceUsd,
												   formattedMaxSupply,
												   formattedSupply,
												   rank,
												   formattedMarketCapUsd,
											   },
											   handleModalOpen,
										   }) => {
	if (isLoading) return <LoadingState />;
	if (isError) return <ErrorState />;

	return (
		<div
			className="flex flex-col w-full md:w-1/3 p-6 border-r border-gray-200 space-y-10 justify-center relative bg-gray-50">
			<Button
				variant="ghost"
				onClick={handelBack}
				className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-2xl font-semibold"
			>
				←
			</Button>
			<div className="text-center space-y-2">
				<img
					src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
					alt={name}
					className="w-32 mx-auto mb-4 rounded-full object-cover"
				/>
				<h1 className="text-3xl font-bold text-gray-700 mb-1">{name}</h1>
				<p className="text-lg font-semibold text-gray-500 uppercase tracking-widest">{symbol}</p>
			</div>
			<div className="text-left space-y-4 rounded-lg p-4 shadow">
				<CoinStats label="Rank" value={rank} />
				<CoinStats label="Supply" value={formattedSupply} />
				<CoinStats label="Price (USD)" value={formattedPriceUsd} />
				<CoinStats label="Market Cap (USD)" value={formattedMarketCapUsd} />
				<CoinStats label="Max Supply" value={formattedMaxSupply ?? 'N/A'} />
			</div>
			<Button
				variant="default"
				onClick={handleModalOpen}
				className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 w-full shadow-md"
			>
				Добавить в портфолио
			</Button>
		</div>
	);
};

const CoinStats = ({ label, value }: { label: string, value: string | number }) => (
	<div className="flex justify-between">
		<p className="text-gray-500">{label}</p>
		<p className="text-xl font-semibold">{value}</p>
	</div>
);

export const LoadingState = () => (
	<div
		className="flex flex-col w-full md:w-1/3 p-6 border-r border-gray-200 space-y-10 justify-center relative bg-gray-50">
		<div className="text-center mb-8 space-y-2">
			<Skeleton className="w-32 h-32 mx-auto mb-4 rounded-full" />
			<Skeleton className="h-6 w-1/2 mx-auto" />
			<Skeleton className="h-4 w-1/4 mx-auto" />
		</div>
		<div className="text-left space-y-4 rounded-lg p-4 shadow">
			{Array.from({ length: 5 }, (_, index) => (
				<Skeleton key={index} className="h-4 w-full" />
			))}
		</div>
		<Skeleton className="h-10 w-full" />
	</div>
);

const ErrorState = () => <div className="mx-auto my-auto">Неверное id монеты</div>;

export default CoinContent;
