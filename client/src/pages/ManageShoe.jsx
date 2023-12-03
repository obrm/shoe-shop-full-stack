import { useParams } from 'react-router';
import { ShoeForm } from '../components';

const ManageShoe = () => {
    const { shoeId } = useParams();

    const details = {
        title: shoeId ? 'Edit Shoe' : 'Add Shoe',
        btnText: shoeId ? 'Update' : 'Add',
    };

    const { title, btnText } = details;

    return (
        <div className="single-column-container">
            <h2>{title}</h2>
            <ShoeForm shoeId={shoeId} btnText={btnText} />
        </div>
    );
};

export default ManageShoe;