import React, { useState, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../auth/AuthContext";
import { FileData } from "../../model/Interfaces";
import { SweetAlert } from "../../components/SweetAlert";
import Base64 from "../../services/Base64";


export const useUpload = () => {
  const { user } = useAuth();
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowedTypes = [
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    const filteredFiles = files.filter((file) => allowedTypes.includes(file.type));
    if (filteredFiles.length !== files.length) {
      SweetAlert("error", "Error", "Some files were not allowed", "Ok");
    }

    setSelectedFiles(filteredFiles);
    setUploadProgress(new Array(filteredFiles.length).fill(0));
  };

  const formatFileTypes = (type: string) => {
    switch (type) {
      case "text/plain":
        return "Text";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "Word";
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "Excel";
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "PowerPoint";
      case "application/pdf":
        return "PDF";
      case "image/png":
        return "PNG";
      case "image/jpeg":
        return "JPEG";
      default:
        return "Unknown";
    }
  }

  const uploadFiles = async () => {
    if (!selectedFiles.length || !user) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      const fileData: FileData = {
        id: 0,
        owner: user.username,
        type: file.type,
        size: file.size,
        createdAt: new Date().toISOString(),
        base64: "dummyBase64",
      };

      try {
        await axios.post(
          "https://localhost:7253/api/Documents/addDocument",
          fileData,
          {
            onUploadProgress: (progressEvent) => {
              const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
              setUploadProgress((prev) => {
                const newProgress = [...prev];
                newProgress[i] = progress;
                return newProgress;
              });
            },
          }
        );

        setFilesData((prevData) => [...prevData, fileData]);
        SweetAlert("success", "File uploaded", "File uploaded successfully", "Ok");
      } catch (error) {
        SweetAlert("error", "Error", "Something went wrong.", "Ok");
      }
    }

    setSelectedFiles([]);
    setUploadProgress([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return { selectedFiles, handleFileChange, uploadFiles, filesData, uploadProgress, fileInputRef, formatFileTypes };
};
