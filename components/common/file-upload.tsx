import React from "react";

export default function FileUpload({ onClose }: { onClose: () => void }) {
  console.log("File Upload", onClose);
  return <div>File</div>;
}
