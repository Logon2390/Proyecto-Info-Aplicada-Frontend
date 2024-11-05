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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (id: number) => {
    setShowModal(true);
    setSelectedFileID(id);
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

  return {
    filesData,
    showModal,
    handleShowModal,
    handleCloseModal,
    handleModalDelete,
  };
};
