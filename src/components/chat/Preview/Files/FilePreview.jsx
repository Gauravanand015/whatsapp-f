import FileViewer from "./FileViewer";
import HandleAndSend from "./HandleAndSend";
import Header from "./Header";
import Input from "./Input";

const FilePreview = () => {
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* container */}
      <div className="w-full flex flex-col items-center">
        {/* header */}
        <Header />
        {/* viewing selected file */}
        <FileViewer />
        <div className="w-full flex flex-col items-center">
          {/* Message input after preview files */}
          <Input />
          {/* send and manipulate files */}
          <HandleAndSend />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
