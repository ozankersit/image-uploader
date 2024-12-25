import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";

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
          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap">Blob Url:</span>
            <div className="border border-gray-300 rounded-md py-1 px-2 whitespace-nowrap flex items-center justify-between gap-5">
              <span>{blob?.url}</span>
              <button
                onClick={onCoplyLink}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Copy Link
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <div className="w-1/2">
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
        </div>
      )}
    </div>
  );
}
