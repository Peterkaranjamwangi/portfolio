"use client";

import { CloudDownloadIcon } from "lucide-react";

const DownloadButton: React.FC = () => {
  const handleDownload = () => {
    const url = "/resume.pdf";

    // Create a temporary anchor element for downloading
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "resume.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Open the file in a new tab
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="transition-all max-w-fit mt-5 duration-300 hover:bg-primary-dark justify-center items-center bg-primary text-white py-2 px-4 rounded"
    >
      <div className="text-white flex gap-2 justify-center items-center">
        <CloudDownloadIcon />
        Download CV
      </div>
    </button>
  );
};

export default DownloadButton;
