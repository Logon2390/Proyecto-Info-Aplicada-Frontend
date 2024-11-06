import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../auth/AuthContext";
import { FileData } from "../../model/Interfaces";
import { SweetAlert } from "../../components/SweetAlert";
import Base64 from "../../services/Base64";


export const useUpload = () => {
  const { user } = useAuth();
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

    const validFiles = files.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
    } else {
      SweetAlert("error", "Error", "File type not allowed", "Ok");
    }
  };

  const uploadFile = async () => {
    if (selectedFiles.length === 0 || !user) return;
  
    try {
      // Convertimos todos los archivos seleccionados a Base64
      const base64Array = await Base64.toBase64(selectedFiles);
  
      // Confirmamos que `base64Array` es un arreglo antes de usar `.map`
      const filesToUpload = (Array.isArray(base64Array) ? base64Array : [base64Array]).map((base64, index) => ({
        id: 0,
        owner: user.username,
        type: selectedFiles[index].type,
        size: selectedFiles[index].size,
        createdAt: new Date().toISOString(),
        base64: base64,
      }));
  
      const response: AxiosResponse = await axios.post(
        "https://localhost:7253/api/Documents/addDocuments",
        filesToUpload
      );
  
      if (response.status === 200) {
        setFilesData([...filesData, ...filesToUpload]);
        SweetAlert("success", "Files uploaded", "Files uploaded successfully", "Ok");
        setSelectedFiles([]);
      } else {
        SweetAlert("error", "Error", "Files upload failed", "Ok");
      }
    } catch (error) {
      SweetAlert("error", "Error", "Something went wrong.", "Ok");
    }
  };

  return { selectedFiles, handleFileChange, uploadFile, filesData };
};
