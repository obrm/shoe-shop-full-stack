import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <p className="not-found">Page Not Found</p>
            <Link to={`/`} className="btn back-btn">Back</Link>

        </>
    )
}

export default NotFound