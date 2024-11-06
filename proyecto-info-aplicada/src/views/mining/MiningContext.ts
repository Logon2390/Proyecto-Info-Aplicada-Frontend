import { Connection } from "../../services/Connection";
import axios, { AxiosResponse } from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { FileData, BlockData } from "../../model/Interfaces";
import { SweetAlert } from "../../components/SweetAlert";

export const useMiningContext = () => {
  const { user } = useAuth();
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [blocksData, setBlocksData] = useState<BlockData[]>([]);
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

    const filteredFiles = files.filter((file) =>
      allowedTypes.includes(file.type)
    );
    if (filteredFiles.length !== files.length) {
      SweetAlert("error", "Error", "Some files were not allowed", "Ok");
    }

    setSelectedFiles(filteredFiles);
    setUploadProgress(new Array(filteredFiles.length).fill(0));
  };

  const startMining = (blockId : string) => {
    Connection.startMining(blockId);
  };

  useEffect(() => {
    if (user) {
      axios
        .post(
          "https://localhost:7253/api/Blocks/userBlocks?owner=" + user?.id
        )
        .then((response) => {
          setBlocksData(response.data.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

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
          "https://localhost:7253/api/Blocks/addBlock?ownerId=" + user.id,
          {
            documentos: [fileData],
          }
        );

        SweetAlert(
          "success",
          "File uploaded",
          "File uploaded successfully to the blockchain.",
          "Ok"
        );
      } catch (error) {
        SweetAlert("error", "Error", "Something went wrong.", "Ok");
      }
    }

    setSelectedFiles([]);
    setUploadProgress([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    startMining,
    selectedFiles,
    handleFileChange,
    uploadFiles,
    filesData,
    uploadProgress,
    fileInputRef,
    blocksData,
  };
};
