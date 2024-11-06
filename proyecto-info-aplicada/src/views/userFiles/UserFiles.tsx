import { useUserFiles } from "../../views/userFiles/UserFilesContext";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
  Table,
  Pagination,
  Form,
  Col,
} from "react-bootstrap";

const UserFiles: React.FC = () => {
  const {
    filesData,
    selectedFiles,
    setSelectedFiles,
    handleFileSelect,
    handlePageChange,
    currentPage,
    filesPerPage,
    paginatedFiles,
    handleShowModal,
    handleCloseModal,
    showModal,
    showModalMultiple,
    showModalZip,
    handleModalDelete,
    handleOpenModalMultiple,
    handleOpenModalZip,
    handleBulkDownload,
    handleBulkDelete,
    formatFileTypes,
  } = useUserFiles();

  return (
    <Container className="mt-5">
      <h1>My files</h1>
      <Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>
                  <Form.Check // Checkbox header for select all functionality
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(paginatedFiles.map((file) => file.id)); // Select all files on the current page
                      } else {
                        setSelectedFiles([]); // Deselect all
                      }
                    }}
                    checked={
                      paginatedFiles.length > 0 &&
                      paginatedFiles.every((file) =>
                        selectedFiles.includes(file.id)
                      )
                    }
                  />
                </th>
                <th>File type</th>
                <th>File size</th>
                <th>Upload date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFiles.length === 0 && (
                <tr>
                  <td colSpan={5}>No files saved yet.</td>
                </tr>
              )}
              {paginatedFiles.map((file, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                    />
                  </td>
                  <td>{formatFileTypes(file.type)}</td>
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

        <Row>
          <Col>
            <Pagination>
              {[
                ...Array(Math.ceil(filesData.length / filesPerPage)).keys(),
              ].map((page) => (
                <Pagination.Item
                  key={page}
                  active={page + 1 === currentPage}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>

          <Col>
            {selectedFiles.length >= 2 && (
              <DropdownButton
                title={selectedFiles.length + " selected"}
                id="bulk-actions-dropdown"
                className="ms-3"
              >
                <Dropdown.Item onClick={() => handleOpenModalZip()}>
                  Download Selected
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleOpenModalMultiple()}>
                  Delete Selected
                </Dropdown.Item>
              </DropdownButton>
            )}
          </Col>
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

      <Modal show={showModalMultiple} onHide={handleCloseModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {selectedFiles.length} files?</p>
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
            onClick={handleBulkDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalZip} onHide={handleCloseModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>A zip file will be created with {selectedFiles.length} files</p>
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
            onClick={handleBulkDownload}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserFiles;
