import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { FileData } from "../model/Interfaces";

import { Button } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import swal from "sweetalert2";
import {
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";

const Upload: React.FC = () => {
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
        swal.fire("Error", "File type not allowed.", "error");
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

        swal.fire("Success", "File uploaded successfully.", "success");
        setSelectedFile(null);
      } else {
        swal.fire("Error", "File upload failed.", "error");
      }
    } catch (error) {
      swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Upload files</h1>
      <Row>
        <Row className="mt-4 mb-3">
          <Col>
            <Button variant="contained" component="label" fullWidth>
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
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
