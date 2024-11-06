import axios from "axios";
import { FileData } from "../../model/Interfaces";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { SweetAlert } from "../../components/SweetAlert";

export const useUserFiles = () => {
  const { user } = useAuth();
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [selectedFileID, setSelectedFileID] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalMultiple, setShowModalMultiple] = useState(false);
  const [showModalZip, setShowModalZip] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

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

  const paginatedFiles = filesData.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(
      (prevSelected) =>
        prevSelected.includes(fileId)
          ? prevSelected.filter((id) => id !== fileId) // Deselect if already selected
          : [...prevSelected, fileId] // Select if not already selected
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowModalMultiple(false);
    setShowModalZip(false);
  };

  const handleShowModal = (id: number) => {
    setShowModal(true);
    setSelectedFileID(id);
  };

  const handleOpenModalMultiple = () => {
    setShowModalMultiple(true);
  };

  const handleOpenModalZip = () => {
    setShowModalZip(true);
  };


  useEffect(() => {
    if (user) {
      axios
        .post(
          "https://localhost:7253/api/Documents/userDocuments?owner=" +
            user?.username
        )
        .then((response) => {
          setFilesData(response.data.value);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  const handleModalDelete = () => {
    if (!selectedFileID) return;

    axios
      .delete(
        "https://localhost:7253/api/Documents/deleteDocument?id=" +
          selectedFileID
      )
      .then((response) => {
        setFilesData(filesData.filter((file) => file.id !== selectedFileID));
        handleCloseModal();

        if (response.data.isSuccess === true) {
          SweetAlert(
            "success",
            "File deleted successfully",
            "File has been deleted",
            "Ok"
          );
        } else {
          SweetAlert(
            "error",
            "Error",
            "An error occurred while deleting the file",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBulkDelete = async () => {
    try {
      const response = await axios.delete("https://localhost:7253/api/Documents/deleteDocuments", { data: selectedFiles });
      if (response.data.isSuccess === true) {
        setSelectedFiles([]);
        setFilesData(filesData.filter((file) => !selectedFiles.includes(file.id)));
        SweetAlert(
          "success",
          "Files deleted successfully",
          "Files have been deleted",
          "Ok"
        );
      }
    } catch (error) {
      SweetAlert(
        "error",
        "Error",
        "An error occurred while deleting the files",
        "error"
      );
      console.error(error);
    }
    setShowModalMultiple(false);
  };

  const handleBulkDownload = () => {
    // Aquí puedes llamar a tu lógica para descargar varios archivos
    alert("Descargar archivos seleccionados: " + selectedFiles.join(", "));
  };

  return {
    filesData,
    showModal,
    showModalMultiple,
    showModalZip,
    currentPage,
    filesPerPage,
    selectedFiles,
    setSelectedFiles,
    paginatedFiles,
    handlePageChange,
    handleFileSelect,
    handleShowModal,
    handleOpenModalMultiple,
    handleOpenModalZip,
    handleCloseModal,
    handleModalDelete,
    formatFileTypes,
    handleBulkDelete,
    handleBulkDownload,
  };
};
