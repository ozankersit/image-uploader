import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import CopyIcon from "./icons/copy-icon";

type Props = {
  blob: PutBlobResult | null;
};

export default function BlobResultSection({ blob }: Props) {
  const onCoplyLink = () => {
    if (blob) {
      navigator.clipboard.writeText(blob.url);
    }
  };
  return (
    <div>
      {blob && (
        <div>
          <div className="flex lg:flex-row flex-col items-center gap-3">
            <span className="whitespace-nowrap">Blob Url:</span>
            <div className="border border-gray-300 rounded-md py-1 px-2 flex items-center gap-5">
              <span className="lg:text-base text-xs whitespace-normal">{blob?.url}</span>
              <button
                onClick={onCoplyLink}>
                <CopyIcon/>
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-5">
              <Image
                src={blob.url}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full object-cover"
                alt={blob.contentType}
              />
            </div>
        </div>
      )}
    </div>
  );
}
