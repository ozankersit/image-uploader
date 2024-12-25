"use client";

import { useState, useRef } from "react";

import type { PutBlobResult } from "@vercel/blob";
import UploadContainer from "./upload-container";
import BlobResultSection from "./blob-result-section";

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
      {loading ? (
        <p className="animate-pulse h-5 w-full bg-gray-200 rounded"></p>
      ) : (
        <BlobResultSection blob={blob} />
      )}
    </>
  );
}
