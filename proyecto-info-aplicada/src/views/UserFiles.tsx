import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileData } from "../model/Interfaces";
import { useAuth } from "../auth/AuthContext";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert2";

import {
    Container,
    Dropdown,
    DropdownButton,
    Modal,
    Row,
    Table,
  } from "react-bootstrap";

const UserFiles: React.FC = () => {
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
          swal.fire("Success", "File deleted successfully", "success");
        } else {
          swal.fire(
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

  return (
    <Container className="mt-5">
      <h1>My files</h1>
      <Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Owner</th>
                <th>File type</th>
                <th>File size</th>
                <th>Upload date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filesData.length === 0 && (
                <tr>
                  <td colSpan={5}>No files found</td>
                </tr>
              )}
              {filesData.map((file, index) => (
                <tr key={index}>
                  <td>{file.owner}</td>
                  <td>{file.type}</td>
                  <td>{(file.size / 1024).toFixed(2)} KB</td>
                  <td>{new Date(file.createdAt).toLocaleString()}</td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Actions">
                      <Dropdown.Item onClick={() => handleShowModal(file.id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => alert("Descargar")}>
                        Download
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this file?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outlined"
            color="success"
            className="m-2"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            color="error"
            onClick={handleModalDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserFiles;
