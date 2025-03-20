import React from "react";

interface DownloadItem {
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  icon: React.ReactNode;
}

interface DownloadCardProps extends DownloadItem {}

const DownloadCard: React.FC<DownloadCardProps> = ({ 
  title, 
  description, 
  fileName, 
  fileSize, 
  fileType, 
  icon 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span className="font-medium">{fileSize}</span> • {fileType}
          </div>
          <a
            href={`/files/${fileName}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

const DownloadsPage: React.FC = () => {
  const downloads: DownloadItem[] = [
    {
      title: "EvilGoose Application",
      description: "Latest version with all features and improvements",
      fileName: "EvilGoose.zip",
      fileSize: "42.3 MB",
      fileType: "ZIP Archive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      title: "1.8.9 Texture Pack",
      description: "Complete guide and reference for all features",
      fileName: "! §4§l§oQwesta§r §7[§8§o16x§r§7]§8.zip",
      fileSize: "17.6 MB",
      fileType: "ZIP File",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Place Holder",
      description: "Place Holder",
      fileName: "",
      fileSize: "0 MB",
      fileType: "ZIP Archive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      ),
    },
    {
      title: "Place Holder",
      description: "Place Holder",
      fileName: "",
      fileSize: "0 MB",
      fileType: "ZIP Archive",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Downloads Center
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            All resources you need in one place
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {downloads.map((download, index) => (
            <DownloadCard key={index} {...download} />
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Need help?</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  If you're having trouble with downloads, please check our{" "}
                  <a
                    href="/troubleshooting"
                    className="font-medium underline hover:text-blue-600"
                  >
                    troubleshooting guide
                  </a>{" "}
                  or{" "}
                  <a
                    href="/support"
                    className="font-medium underline hover:text-blue-600"
                  >
                    contact support
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;