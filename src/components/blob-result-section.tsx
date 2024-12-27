import { PutBlobResult } from "@vercel/blob";
import UrlSection from "./url-section";

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
    <>
    {blob && (
        <div className="flex flex-col gap-5">
          <UrlSection blob={blob.url} onCoplyLink={onCoplyLink} />
          <UrlSection blob={blob.downloadUrl} isDownload />
        </div>
      )}
    </>
      
  );
}
