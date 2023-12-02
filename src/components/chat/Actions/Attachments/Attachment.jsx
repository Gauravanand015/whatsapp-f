import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu/Menu";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowPicker,
}) => {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          setShowPicker(false);
          setShowAttachments((prev) => !prev);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_2" />
      </button>
      {showAttachments ? <Menu /> : null}
    </li>
  );
};

export default Attachments;
