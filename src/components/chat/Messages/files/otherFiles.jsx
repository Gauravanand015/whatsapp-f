import { DownloadIcon } from "../../../../svg";

const OtherFiles = ({ file, type }) => {
  return (
    <div>
      {/* container */}
      <div className="flex justify-between gap-2 h-[50px] w-[200px]">
        {/* file infos */}
        <div className="flex items-center gap-2">
          <img
            src={`images/files/${type}.png`}
            alt=""
            className="w-10 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h1>
              {file.original_filename}.{file.public_id.split(".")[1]}
            </h1>
            <span className="text-sm">{Math.round(file.bytes / 1024)} KB</span>
          </div>
        </div>
        <a href={file.secure_url} target="_blank" download rel="noreferrer">
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
};

export default OtherFiles;
