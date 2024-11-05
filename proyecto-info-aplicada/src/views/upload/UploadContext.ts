import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../auth/AuthContext";
import { FileData } from "../../model/Interfaces";
import { SweetAlert } from "../../components/SweetAlert";

export const useUpload = () => {
  const { user } = useAuth();
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = [
        "text/plain",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/pdf",
        "image/png",
        "image/jpeg",
      ];

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        SweetAlert("error", "Error", "File type not allowed", "Ok");
      }
    }
  };

  const uploadFile = async () => {
    if (!selectedFile || !user) return;

    const fileData: FileData = {
      id: 0,
      owner: user.username,
      type: selectedFile.type,
      size: selectedFile.size,
      createdAt: new Date().toISOString(),
      base64: "dummyBase64",
    };

    try {
      const response: AxiosResponse = await axios.post(
        "https://localhost:7253/api/Documents/addDocument",
        fileData
      );

      if (response.status === 200) {
        setFilesData([...filesData, fileData]);
        SweetAlert("success", "File uploaded", "File uploaded successfully", "Ok");
        setSelectedFile(null);
      } else {
        SweetAlert("error", "Error", "File upload failed", "Ok");
      }
    } catch (error) {
      SweetAlert("error", "Error", "Something went wrong.", "Ok");
    }
  };

  return { selectedFile, handleFileChange, uploadFile, filesData };
};
