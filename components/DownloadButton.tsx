import { CloudDownloadIcon } from "lucide-react";
import Link from "next/link";

const DownloadButton: React.FC = () => {
  return (
    <button className="transition-all max-w-fit mt-5 duration-300 hover:bg-primary-dark justify-center items-center bg-primary text-white py-2 px-4 rounded">
      <Link
        href="/resume.pdf"
        target="_blank"
        className="text-white flex gap-2 justify-center items-center"
      >
        <CloudDownloadIcon />
        Download CV
      </Link>
    </button>
  );
};

export default DownloadButton;
