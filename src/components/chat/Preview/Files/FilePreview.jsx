import { useState } from "react";
import FileViewer from "./FileViewer";
import HandleAndSend from "./HandleAndSend";
import Header from "./Header";
import Input from "./Input";

const FilePreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* container */}
      <div className="w-full flex flex-col items-center">
        {/* header */}
        <Header activeIndex={activeIndex} />
        {/* viewing selected file */}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center mt-4">
          {/* Message input after preview files */}
          <Input message={message} setMessage={setMessage} />
          {/* send and manipulate files */}
          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
