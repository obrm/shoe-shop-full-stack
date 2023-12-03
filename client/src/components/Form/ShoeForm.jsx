import { useShoeForm } from '../../hooks';

import Input from './Input';

import './style.css';

const ShoeForm = ({ shoeId, btnText }) => {
    const { shoe, loading, errors, handleChange, handleSubmit } = useShoeForm(shoeId);

    const fields = [
        {
            id: 1,
            name: 'Name',
            inputName: 'name',
            value: shoe.name,
            type: 'text',
            error: errors.name
        },
        {
            id: 2,
            name: 'Brand',
            inputName: 'brand',
            value: shoe.brand,
            type: 'text',
            error: errors.brand
        },
        {
            id: 3,
            name: 'Image',
            inputName: 'image',
            value: shoe.image,
            type: 'text',
            error: errors.image
        },
        {
            id: 4,
            name: 'Price',
            inputName: 'price',
            value: shoe.price,
            type: 'text',
            error: errors.price
        },
    ];

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <Input key={field.id} {...field} handleChange={handleChange} />
            ))}
            <button className="btn update-btn" type="submit">{btnText}</button>
        </form>
    );
};

export default ShoeForm;