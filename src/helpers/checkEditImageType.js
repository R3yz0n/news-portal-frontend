const checkEditImageType = (file) => {
  // Check if a file is provided

  if (!file) {
    return;
  } else {
    // Define the allowed image file extensions
    const allowedExtensions = ["jpg", "jpeg", "png"];

    // Get the file extension
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split(".").pop();

    // Check if the file extension is in the allowedExtensions array
    if (allowedExtensions.includes(fileExtension)) {
      return null;
    } else {
      return `${fileExtension} is invalid file format`;
    }
  }
};

export default checkEditImageType;
