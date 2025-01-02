// import { Button } from "@/components/ui/button";
// import { Upload, X } from "lucide-react";
// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

// interface FileUploadProps {
//   onClose: () => void;
// }

// export default function FileUpload({ onClose }: FileUploadProps) {
//   const [files, setFiles] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<string[]>([]);
//   const [uploading, setUploading] = useState(false);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 5));

//     // Create previews for images
//     const newPreviews = acceptedFiles.map((file) => {
//       if (file.type.startsWith("image/")) {
//         return URL.createObjectURL(file);
//       }
//       return null;
//     });
//     // setPreviews((prev) => [...prev, ...newPreviews].slice(0, 5));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     maxFiles: 5,
//     multiple: true,
//     maxSize: 25 * 1024 * 1024,
//   });

//   const handleUpload = async () => {
//     if (!files.length) return;

//     try {
//       setUploading(true);
//       const formData = new FormData();
//       files.forEach((file, index) => {
//         formData.append(`file${index}`, file);
//       });

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Upload failed");

//       const data = await response.json();
//       // Here you can handle the response from your backend
//       // For example, insert the file URL into your editor
//       onClose();
//     } catch (error) {
//       console.error("Upload error:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const clearFile = (index: number) => {
//     if (previews[index]) URL.revokeObjectURL(previews[index]);
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//     setPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const clearAllFiles = () => {
//     previews.forEach((preview) => {
//       if (preview) URL.revokeObjectURL(preview);
//     });
//     setFiles([]);
//     setPreviews([]);
//   };

//   return (
//     <div className="w-full">
//       {!files.length ? (
//         <div
//           {...getRootProps()}
//           className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300"}`}
//         >
//           <input {...getInputProps()} />
//           <Upload className="mx-auto mb-4 h-10 w-10 text-gray-400" />
//           <p className="text-sm text-gray-600">
//             {isDragActive
//               ? "Drop the file here"
//               : "Drag and drop a file here, or click to select"}
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {files.map((file, index) => (
//             <div key={index} className="relative rounded-lg border p-4">
//               <button
//                 onClick={() => clearFile(index)}
//                 className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100"
//               >
//                 <X className="h-4 w-4" />
//               </button>

//               {previews[index] ? (
//                 <img
//                   src={previews[index]}
//                   alt="Preview"
//                   className="mx-auto max-h-[200px] object-contain"
//                 />
//               ) : (
//                 <div className="py-4 text-center">
//                   <p className="text-sm text-gray-600">{file.name}</p>
//                   <p className="text-xs text-gray-400">
//                     {(file.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}

//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpload} disabled={uploading}>
//               {uploading ? "Uploading..." : "Upload"}
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
