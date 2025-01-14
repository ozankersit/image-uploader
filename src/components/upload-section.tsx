"use client";

import { useState, useRef, useTransition } from "react";

import type { PutBlobResult } from "@vercel/blob";
import UploadContainer from "./upload-container";
import BlobResultSection from "./blob-result-section";

export default function UploadSection() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (response.ok) {
        const newBlob = (await response.json()) as PutBlobResult;
        setBlob(newBlob);
      } else {
        console.error("Upload failed");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <UploadContainer inputFileRef={inputFileRef} />
        <div className="flex justify-center my-5">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
      {isPending ? (
        <p className="animate-pulse h-5 w-full bg-gray-200 rounded"></p>
      ) : (
        <BlobResultSection blob={blob} />
      )}
    </>
  );
}
