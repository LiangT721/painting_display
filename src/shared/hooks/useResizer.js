
import imageCompression from "browser-image-compression";

export const useResizer = () => {
  const imageCompress = async (
    orginalImage,
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker
  ) => {
    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker
    };
    try {
      const name = orginalImage.name;
      const resizerImage = await imageCompression(orginalImage, options);
      const file = new File([resizerImage], name, {
        type: resizerImage.type
      });
      return file;
    } catch (error) {
      alert(error);
    }
  };
  return [imageCompress]
};
