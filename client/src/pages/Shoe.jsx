import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useGlobalAuthContext, useGlobalShoeContext } from "../hooks";


const Shoe = () => {
    const { shoeId } = useParams();

    const navigate = useNavigate();

    const { user } = useGlobalAuthContext();

    const { fetchShoe, currentShoe, isLoading, handleDeleteShoe } = useGlobalShoeContext();

    useEffect(() => {
        fetchShoe(shoeId);
    }, [fetchShoe, shoeId]);

    const handleDelete = () => {
        handleDeleteShoe(shoeId);
        navigate('/');
    };

    if (isLoading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <main className='single-column-container'>
            <div className='shoe-container'>
                <h3 className='shoe-name'>
                    {currentShoe.name}
                </h3>
                <h2 className='shoe-brand'>
                    {currentShoe.brand}
                </h2>
                <img
                    className='shoe-img'
                    src={currentShoe.image}
                    alt='shoe-img'
                />
                <h2 className='shoe-price'>
                    {`${currentShoe.price}$`}
                </h2>
                {user && user.role === 'admin' && (
                    <>
                        <Link
                            to={`/products/${currentShoe.id}/edit`}
                            className="btn"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn"
                        >
                            Delete
                        </button>
                    </>
                )
                }
            </div>
        </main>

    );


};

export default Shoe;