import UploadIcon from "./icons/upload-icon";

type Props = {
    inputFileRef: React.RefObject<HTMLInputElement | null>;
}

export default function UploadContainer({inputFileRef}: Props) {
  return (
    <div className="flex items-center justify-center w-full mt-5 md:px-0 px-5">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon/>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">
            up to 45mb
          </p>
        </div>
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          className="hidden"
          id="dropzone-file"
          required
          // accept="image/png, image/gif, image/jpeg, image/svg"
        />
      </label>
    </div>
  );
}
