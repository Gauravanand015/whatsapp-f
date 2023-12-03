import { useRef } from "react";
import { PhotoIcon } from "../../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/files";

const PhotoAttachment = () => {
  const disPatch = useDispatch();
  const inputRef = useRef(null);
  const imageHandler = (event) => {
    let files = Array.from(event.target.files);
    console.log(files);
    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/gif" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "video/mp4" &&
        file.type !== "video/webm"
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
              fileData: event.target.result,
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
        className="bg-[#BF59CF] rounded-full"
        onClick={() => inputRef.current.click()}
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/jpg,video/mp4,video/webm"
        onChange={imageHandler}
      />
    </li>
  );
};

export default PhotoAttachment;
