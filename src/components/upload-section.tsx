"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { PutBlobResult } from "@vercel/blob";
import UploadContainer from "./upload-container";

export default function UploadSection() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1>Upload Your Avatar</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);

          if (!inputFileRef.current?.files) {
            setLoading(false);
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: "POST",
              body: file,
            }
          );

          if (response.ok) {
            const newBlob = (await response.json()) as PutBlobResult;
            setBlob(newBlob);
          } else {
            console.error("Upload failed");
          }
          setLoading(false);
        }}
      >
        <UploadContainer inputFileRef={inputFileRef} />
        <button type="submit" disabled={loading}>
          Upload
        </button>
      </form>
      {loading && (
        <p className="animate-pulse h-5 w-full bg-gray-200 rounded"></p>
      )}
      {blob && (
        <div>
          <p>
            Blob URL: <a href={blob.url}>{blob.url}</a>
          </p>
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
      )}
    </>
  );
}
