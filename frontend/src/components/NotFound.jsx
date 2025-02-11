import { Link } from 'react-router-dom';

const NotFound = () => {
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-primary">
            404
        </h1>
        <h4 className="text-2xl mt-4 text-secondary">
            Page Not Found
        </h4>
        <p className="mt-2 mb-6 text-center">
            Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="bg-primary text-white px-4 py-2 rounded">
            Go to Home
        </Link>
    </div>
);
}

export default NotFound;