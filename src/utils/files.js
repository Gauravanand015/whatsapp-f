export const getFileType = (memType) => {
  switch (memType) {
    case "text/plain":
      return "txt";
    case "application/pdf":
      return "pdf";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "pptx";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "xlsx ";
    case "application/vnd.rar":
      return "rar";
    case "application/zip":
      return "zip";
    case "audio/mpeg":
    case "audio/wav":
      return "audio";
    case "video/mp4":
    case "video/mpeg":
      return "video";
    default:
      return "image";
  }
};
