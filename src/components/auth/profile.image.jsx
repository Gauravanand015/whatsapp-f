import { useRef, useState } from "react";

const ProfileImage = ({ readAblePicture, setPicture, setReadAblePicture }) => {
  const [error, setError] = useState("");
  const inputRef = useRef();

  //image handler
  const imageHandler = (event) => {
    let image = event.target.files[0];
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpeg" &&
      image.type !== "image/jpg"
    ) {
      setError(`${image.name} format is not supported`);
      return;
    } else if (image.size > 1024 * 1025 * 5) {
      setError(`${image.name} size is too large,maximum 2mb allowed`);
      return;
    } else {
      setError("");
      setPicture(image);
      // reading the image
      const reader = new FileReader();
      reader.readAsDataURL(image); // data URL is a way to represent data, including images, as a base64-encoded string.
      reader.onload = (event) => {
        setReadAblePicture(event.target.result);
      };
    }
  };

  const handleImageChange = () => {
    setPicture("");
    setReadAblePicture("");
  };

  return (
    <div className="mt-1 content-center dark:text-dark_text_1 space-y-1">
      <label className="text-sm font-semibold tracking-wide">
        Picture (Optional)
      </label>
      {readAblePicture ? (
        <div>
          <img
            src={readAblePicture}
            alt="pic"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="mt-1 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xm flex items-center justify-center cursor-pointer"
            onClick={handleImageChange}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-10 dark:bg-dark_bg_3 rounded-md font-semibold flex items-center justify-center cursor-pointer
        "
          onClick={() => {
            console.log(inputRef.current.click());
          }}
        >
          Upload Image
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/jpg,image/png,image/jpeg"
        onChange={imageHandler}
      />
      {error ? (
        <div>
          <p className="text-red-300">{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileImage;
