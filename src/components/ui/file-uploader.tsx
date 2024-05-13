import { useRef } from "react";
import { FileActionType, useFileContext } from ".";
import axios from "axios";

type FileUploaderProps = {
  file?: File | null;
}
const FileUploader = ({ file }: FileUploaderProps) => {
  const { state, dispatch }  = useFileContext()
  const inputRef = useRef(null);

  console.log('file:', file)

  function onChange(e: any) {
    const file = e.target.files[0];
    
    var action = {
      type: FileActionType.select,
      payload: {
        file: file,
        isLoading: false
      }
    }

    dispatch(action);
  }

  const uploadFile = () => {
    const file = state.file

    var formData = new FormData();
    formData.append("file", file!);

    var action = {
      type: FileActionType.upload,
    }

    dispatch(action);

    axios.post('http://localhost:8000/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(handleUploadFileSuccessResponse)
    .catch(handleUploadFileErrorResponse)
  }

  const handleUploadFileSuccessResponse = (response: any) => {
    console.log('handleUploadFileSuccessResponse:', response)

    if (inputRef != null) {
      // @ts-ignore
      inputRef.current.value = ""
    }

    var action = {
      type: FileActionType.success,
    }

    dispatch(action);
  }

  const handleUploadFileErrorResponse = (response: any) => {
    console.log('handleUploadFileErrorResponse:', response)

    if (inputRef != null) {
      // @ts-ignore
      inputRef.current.value = ""
    }

    var action = {
      type: FileActionType.error,
    }

    dispatch(action);
  }

  return (
    <div className = "flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" ref={inputRef} onChange={(e) => {onChange(e)}} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" />
      </div>
      {file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold" onClick={uploadFile}>Upload the file</button>}
    </div>
  );
};

export { FileUploader };
