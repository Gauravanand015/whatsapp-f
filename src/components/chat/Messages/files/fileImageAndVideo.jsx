const FileImageAndVideo = ({ url, type }) => {
  return (
    <div>
      {type === "image" ? (
        <img src={url} alt="" />
      ) : (
        <video src={url} controls />
      )}
    </div>
  );
};
export default FileImageAndVideo;
