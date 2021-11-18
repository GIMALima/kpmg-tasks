import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Tooltip } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { updateTaskState } from "../../actions/task.actions";
import { uploadSolution } from "../../actions/task.actions";
import { REVIEW_STATE } from "../../Constants";

const UploadFile = ({ task }) => {
  const [file, setFile] = useState();
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setSave(!save);
  };

  const handleFile = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    dispatch(uploadSolution(task.id, data));
    dispatch(updateTaskState(task.id, REVIEW_STATE));
  };

  return (
    <form onSubmit={handleFile}>
      <input
        accept=".zip"
        onChange={handleChange}
        style={{ display: "none" }}
        id={task.id}
        multiple
        type="file"
      />
      {!save && (
        <label htmlFor={task.id} style={{ zIndex: "1000" }}>
          <Tooltip title="Upload solution">
            <Button variant="raised" component="span">
              <FileUploadIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            </Button>
          </Tooltip>
        </label>
      )}
      {save && (
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#C55494",
          }}
          startIcon={<FilePresentIcon />}
        >
          Send solution
        </Button>
      )}
    </form>
  );
};

export default UploadFile;
