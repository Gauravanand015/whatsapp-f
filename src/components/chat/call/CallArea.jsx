import { Capitalize } from "../../../utils/string";

const CallArea = ({ name }) => {
  return (
    <div className="absolute top-12 z-40 w-full p-1">
      {/* container */}
      <div className="flex flex-col items-center">
        {/* call infos */}
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name ? Capitalize(name) : ""}</b>
          </h1>
        </div>
        <span className="text-dark_text_1">Ringing...</span>
      </div>
    </div>
  );
};

export default CallArea;
