const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="btn-primary inline-flex"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
