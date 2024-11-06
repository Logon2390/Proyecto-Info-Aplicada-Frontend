import React from "react";
import { Col, Container, Row, Table, Pagination } from "react-bootstrap";
import { Button } from "@mui/material";
import { useState } from "react";
import { useMiningContext } from "./MiningContext";

const Mining: React.FC = () => {
  const {
    startMining,
    filesData,
    handleFileChange,
    uploadFiles,
    selectedFiles,
    fileInputRef,
    blocksData,
  } = useMiningContext();
  const [currentPage, setCurrentPage] = useState(1);
  const blocksPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedBlocks = blocksData.slice(
    (currentPage - 1) * blocksPerPage,
    currentPage * blocksPerPage
  );

  return (
    <Container className="mt-5">
      <h1>Upload Files to Mine</h1>
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

      <h1>My Blocks</h1>
      <Row>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mine date</th>
              <th>Tests</th>
              <th>Mss</th>
              <th>Hash Prev</th>
              <th>Hash</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlocks.length === 0 && (
              <tr>
                <td colSpan={5}>No blocks added yet.</td>
              </tr>
            )}
            {paginatedBlocks.map((block, index) => (
              <tr key={index}>
                <td>{block.id}</td>
                <td>{block.fechaMinado}</td>
                <td>{block.prueba}</td>
                <td>{block.milisegundos}</td>
                <td>{block.hashPrevio}</td>
                <td>{block.hash}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => startMining(block.id)}
                  >
                    Mine
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      <Row className="justify-content-center">
        <Pagination>
          {[...Array(Math.ceil(blocksData.length / blocksPerPage)).keys()].map(
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

export default Mining;
