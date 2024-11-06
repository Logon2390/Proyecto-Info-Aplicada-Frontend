import {useUserFiles} from "../../views/userFiles/UserFilesContext";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const UserFiles: React.FC = () => {

  const { filesData, showModal, handleShowModal, handleCloseModal, handleModalDelete, formatFileTypes } = useUserFiles();
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
