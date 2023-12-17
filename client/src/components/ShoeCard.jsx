import { Link } from 'react-router-dom';

const ShoeCard = ({ id, name, brand, image, price }) => {
  return (
    <div className='shoe-container'>
      <h3 className='shoe-name'>
        <Link to={`/shoe/${id}`}>
          {name}
        </Link>
      </h3>
      <h2 className='shoe-brand'>{brand}</h2>
      <Link to={`/shoe/${id}`}>
        <img className='shoe-img' src={image} alt='shoe-img' />
      </Link>
      <h2 className='shoe-price'>{`${price}$`}</h2>
    </div>
  );
};
export default ShoeCard;