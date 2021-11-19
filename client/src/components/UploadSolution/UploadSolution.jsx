import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { uploadSolution } from "../../actions/task.actions";

const UploadFile = ({ task }) => {
  const [file, setFile] = useState();
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorReducer);

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);

    if (
      e.target.files[0].type === "application/zip" ||
      e.target.files[0].type === "application/x-zip-compressed"
    ) {
      setSave(!save);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleFile = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    dispatch(uploadSolution(task.id, data));
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
        <>
          <span className="form__error">
            {(errors.uploadError.length > 0 || error) && "Ivalid file format"}
          </span>
          <label htmlFor={task.id} style={{ zIndex: "1000" }}>
            <Tooltip title="Upload solution">
              <Button variant="raised" component="span">
                <FileUploadIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
              </Button>
            </Tooltip>
          </label>
        </>
      )}
      {save && errors.uploadError.length === 0 && !error && (
        <>
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
        </>
      )}
    </form>
  );
};

export default UploadFile;
