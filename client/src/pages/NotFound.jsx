import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <h1 className="not-found">Page Not Found</h1>
            <Link to={`/`} className="btn back-btn">Back</Link>

        </>
    )
}

export default NotFound