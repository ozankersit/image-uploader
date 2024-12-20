"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { PutBlobResult } from "@vercel/blob";

export default function UploadSection() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
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
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>

      {blob && (
        <div>
          <p>Blob URL: <a href={blob.url}>{blob.url}</a></p>
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
