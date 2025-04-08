import React from "react";

interface DownloadItem {
  title: string;
  description: string;
  fileName: string;
  author: string;
  fileSize: string;
  fileType: string;
  icon: React.ReactNode;
}

interface DownloadCardProps extends DownloadItem {}

const DownloadCard: React.FC<DownloadCardProps> = ({ 
  title, 
  description, 
  fileName, 
  author,
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
            <p className="text-xs font-semibold text-gray-800">By: <span className="font-semibold text-gray-800 text-xs mt-1">{author}</span></p> </div>
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
      author: "Jakoby",
      fileName: "EvilGoose.zip",
      fileSize: "13.4 MB",
      fileType: "ZIP File",
      icon: <img src="/images/goose.png" alt="EvilGoose Icon" className="h-12 w-12" />,
    },
    {
      title: "Rick Roll",
      description: "A .exe file that Rick rolls hiddenly",
      author: "Milis",
      fileName: "RickRoll.exe",
      fileSize: "43.4 MB",
      fileType: ".exe File",
      icon: <img src="/images/roll.png" alt="RIck Roll" className="h-12 w-12" />,
    },
    {
      title: "System 32 Deletion Prank",
      description: "Makes you thing you have deleted System 32",
      author: "Milis",
      fileName: "System32DeletionPrank.zip",
      fileSize: "1,247 B",
      fileType: "ZIP File",
      icon: <img src="/images/folder.png" alt="System 32 deletion prank" className="h-12 w-12" />,
    },
    {
      title: "1.8.9 Texture Pack",
      description: "Complete guide and reference for all features",
      author: "Technolot",
      fileName: "! §4§l§oQwesta§r §7[§8§o16x§r§7]§8.zip",
      fileSize: "17.6 MB",
      fileType: "ZIP File",
      icon: <img src="/images/texturepack.png" alt="1.8.9 Texture" className="h-12 w-12" />,
    }
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
        <p className="mt-6 text-center text-gray-500 text-lg">More coming soon...</p>

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
              <h3 className="text-sm font-medium text-blue-800">Disclaimer</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  This is not my work. This page simply serves as a place for others to download and access these files.
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