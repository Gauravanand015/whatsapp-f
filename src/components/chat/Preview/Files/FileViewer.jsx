import { useSelector } from "react-redux";

export default function FileViewer({ activeIndex }) {
  const { files } = useSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%]">
      {/*Container */}
      <div className="flex justify-center items-center">
        {files[activeIndex].type === "image" ? (
          <img
            src={files[activeIndex].fileData}
            alt=""
            className="max-w-[80%] object-contain h_view"
          />
        ) : files[activeIndex].type === "video" ? (
          <video
            src={files[activeIndex].fileData}
            controls // play preview videos, control audio etc...
            className="max-w-[80%] object-contain h_view"
          ></video>
        ) : (
          <div className="min-w-full h_view flex flex-col items-center justify-center">
            {/* File Icon Image */}
            <img
              src={`../../../../images/files/${files[activeIndex].type}.png`}
              alt={files[activeIndex].type}
            />
            {/*No preview text*/}
            <h1 className="dark:text-dark_text_2 text-md">
              No preview available
            </h1>
            {/*File size / type*/}
            <span className="dark:text-dark_text_2">
              {files[activeIndex]?.file?.size} kB - {files[activeIndex]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
