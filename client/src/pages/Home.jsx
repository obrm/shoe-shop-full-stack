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
    console.log(shoes)
    return (
        <section className='shoes-container'>
            {shoes.map((shoe, idx) => {
                return (
                    <ShoeCard key={shoe.id || idx} {...shoe} />
                );
            })}
        </section>
    );
};

export default Home;