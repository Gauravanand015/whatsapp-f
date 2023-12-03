import { useSelector } from "react-redux";

const FileViewer = ({ activeIndex }) => {
  let { files } = useSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%]">
      {/* container */}
      <div className="flex justify-center items-center">
        {/* {console.log(files[0])} */}
        {files[activeIndex].type === "image" ? (
          <img
            src={files[activeIndex].fileData}
            alt=""
            className="max-w-[80%] object-contain h_view"
          />
        ) : (
          <div className="min-w-full h_view flex flex-col items-center justify-center">
            {/* {console.log(files[0].type)} */}
            <img
              src={`images/files/${files[activeIndex].type}.png`}
              alt=""
              className="mt-[50px]"
            />
            <h1 className="dark:text-dark_text_2 text-m">
              No Preview Available
            </h1>
            <span className="dark:text-dark_text_2">
              {files[activeIndex]?.file?.size} kb - {files[activeIndex].type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
