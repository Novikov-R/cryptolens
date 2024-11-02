import SearchPanel from '../components/searchPanel/SearchPanel.tsx';
import CoinTable from '../components/coinTable/CoinTable.tsx';

export const Home = () => {
	return (
		<div className="container mx-auto max-w-[1260px] max-lg:w-full">
			<SearchPanel />
			<CoinTable />
		</div>
	);
};

export default Home;
