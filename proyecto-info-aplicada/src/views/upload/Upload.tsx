import { Button } from "@mui/material";
import { useUpload } from "./UploadContext";
import { Col, Container, Row, Table } from "react-bootstrap";

const Upload: React.FC = () => {
  const { selectedFiles, handleFileChange, uploadFile, filesData } = useUpload();

  return (
    <Container className="mt-5">
      <h1>Upload files</h1>
      <Row>
        <Row className="mt-4 mb-3">
          <Col>
            <Button variant="contained" component="label" fullWidth>
              Upload Files
              <input type="file" hidden onChange={handleFileChange} multiple />
            </Button>
            {selectedFiles.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={uploadFile}
                className="mt-3"
              >
                Upload Files
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
