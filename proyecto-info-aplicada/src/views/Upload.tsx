import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { FileData } from "../model/Interfaces";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Button, FormControl } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import Swal from "sweetalert2";

const Upload: React.FC = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navegar = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

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
        Swal.fire("Error", "File type not allowed.", "error");
      }
    }
  };

  const uploadFile = async () => {
    if (!selectedFile || !user) return;

    const fileData: FileData = {
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

        Swal.fire("Success", "File uploaded successfully.", "success");
        setSelectedFile(null);
      } else {
        Swal.fire("Error", "File upload failed.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Upload files</h1>
      <Row>
        <Row className="mt-4 mb-3">
          <Col>
            <FormControl fullWidth>
              <Button variant="contained" component="label" fullWidth>
                Upload File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </FormControl>
            {selectedFile && (
              <Button
                variant="contained"
                color="primary"
                onClick={uploadFile}
                className="mt-3"
              >
                Upload File
              </Button>
            )}
          </Col>
        </Row>

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
                  <td colSpan={5}>No files uploaded yet.</td>
                </tr>
              )}
              {filesData.map((file, index) => (
                <tr key={index}>
                  <td>{file.owner}</td>
                  <td>{file.type}</td>
                  <td>{(file.size / 1024).toFixed(2)} KB</td>
                  <td>{new Date(file.createdAt).toLocaleString()}</td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Acciones">
                      <Dropdown.Item onClick={() => alert("Eliminar")}>
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
    </Container>
  );
};

export default Upload;
