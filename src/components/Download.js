import { useEffect } from "react";

const Download = () => {
    useEffect(() => {
        // Redirect to the file
        window.location.href = "/files/EvilGoose.zip";
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
            <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg max-w-sm animate-fadeIn">
                <h2 className="text-2xl font-bold">Your download is starting...</h2>
                <p className="mt-2 text-gray-600">If it doesn't start, click below:</p>
                <a 
                    href="/files/EvilGoose.zip" 
                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    Download Now
                </a>
            </div>
        </div>
    );
};

export default Download;
