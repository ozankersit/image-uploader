import Link from "next/link";
import CopyIcon from "./icons/copy-icon";
import DownloadIcon from "./icons/download-icon";

type Props = {
  blob: string;
  onCoplyLink?: () => void;
  isDownload?: boolean;
};

export default function UrlSection({ blob, onCoplyLink, isDownload }: Props) {
  return (
    <div className="flex lg:flex-row flex-col items-center gap-3">
      <span className="whitespace-nowrap">
        {isDownload ? "Download Url: " : "Image Url: "}
      </span>
      <div className="border border-gray-300 rounded-md py-1 px-2 flex items-center gap-5">
        <span className="lg:text-base text-xs whitespace-normal">{blob}</span>
        {!isDownload ? (
          <button onClick={onCoplyLink}>
            <CopyIcon />
          </button>
        ) : (
          <Link href={blob}>
            <DownloadIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
