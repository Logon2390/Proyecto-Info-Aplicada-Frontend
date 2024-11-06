import { Button, LinearProgress } from "@mui/material";
import { useUpload } from "./UploadContext";
import { Col, Container, Row, Table, Pagination } from "react-bootstrap";
import { useState } from "react";

const Upload: React.FC = () => {
  const {
    selectedFiles,
    handleFileChange,
    uploadFiles,
    filesData,
    uploadProgress,
    fileInputRef,
    formatFileTypes,
  } = useUpload();
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedFiles = filesData.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  );

  return (
    <Container className="mt-5">
      <h1>Upload Files</h1>
      <Row className="mb-4">
        <Col>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef} // Reference for resetting the input
            className="form-control"
          />
          {selectedFiles.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={uploadFiles}
              className="mt-3"
            >
              Upload All Files
            </Button>
          )}
        </Col>
      </Row>

      {selectedFiles.length > 0 && (
        <Row className="mb-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="mb-2">
              <p>{file.name}</p>
              <LinearProgress
                variant="determinate"
                value={uploadProgress[index] || 0}
              />
            </div>
          ))}
        </Row>
      )}

      <Row>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Owner</th>
              <th>File Type</th>
              <th>File Size</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.length === 0 && (
              <tr>
                <td colSpan={5}>No files uploaded yet.</td>
              </tr>
            )}
            {paginatedFiles.map((file, index) => (
              <tr key={index}>
                <td>{file.owner}</td>
                <td>{formatFileTypes(file.type)}</td>
                <td>{(file.size / 1024).toFixed(2)} KB</td>
                <td>{new Date(file.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      <Row className="justify-content-center">
        <Pagination>
          {[...Array(Math.ceil(filesData.length / filesPerPage)).keys()].map(
            (page) => (
              <Pagination.Item
                key={page}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Row>
    </Container>
  );
};

export default Upload;
