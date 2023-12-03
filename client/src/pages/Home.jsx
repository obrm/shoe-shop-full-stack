import { useGlobalShoeContext } from '../hooks';

import { ShoeCard } from '../components';

import './style/Home.css'

const Home = () => {
    const {
        shoes,
        isLoading,
    } = useGlobalShoeContext();

    if (isLoading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <section className='shoes-container'>
            {shoes && shoes.map(shoe => {
                return (
                    <ShoeCard key={shoe.id} {...shoe} />
                );
            })}
        </section>
    );
};

export default Home;