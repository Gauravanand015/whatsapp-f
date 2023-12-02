import { useRef } from "react";
import { DocumentIcon } from "../../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/files";

const DocumentAttachment = () => {
  const inputRef = useRef();
  const disPatch = useDispatch();
  const documentHandler = (event) => {
    let files = Array.from(event.target.files);
    console.log(files);
    files.forEach((file) => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/zip"
      ) {
        files = files.filter((item) => item.name !== file.name); // It keeps only those files whose names are not the same as the current image's name.
        return;
      } else if (file.size > 1024 * 1024 * 3) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        // preview images to the user
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          disPatch(
            addFiles({
              file: file,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        type="button"
        className="bg-[#5F66CD] rounded-full"
        onClick={() => inputRef.current.click()}
      >
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain"
        onChange={documentHandler}
      />
    </li>
  );
};

export default DocumentAttachment;
