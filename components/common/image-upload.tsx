"use client";
import { Button } from "@/components/ui/button";
import { useUploadFileMutation } from "@/redux/features/shared/file-upload/api";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (fileUrl: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  // State to store selected files
  const [files, setFiles] = useState<File[]>([]);
  // State to track upload progress
  const [uploading, setUploading] = useState<boolean>(false);

  // Callback function for handling file drops
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles([acceptedFiles[0]]); // Only keep the first file
    }
  }, []);

  // Initialize react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Function to handle file upload
  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", files[0]); // Only upload the first file

    try {
      // Send POST request to upload images
      const response = await uploadFile({
        file: files[0],
        contentType: "image/jpeg",
      });
      console.log("Image response", response);
      onChange(response.data?.fileUrl || ""); // Return the uploaded file URL
      setFiles([]); // Clear the selected files
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start">
      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`mb-4 flex h-40 w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-primary p-4 text-center text-sm ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-primary"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{"Drop the files here ..."}</p>
        ) : (
          <p>{"Drag 'n' drop some files here, or click to select files"}</p>
        )}
      </div>

      {/* Upload button */}
      <Button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="rounded bg-green-500 px-8 py-4 text-xl text-white disabled:bg-gray-300"
      >
        {uploading ? "Uploading..." : "Upload to S3"}
      </Button>
    </div>
  );
};

export default ImageUpload;
