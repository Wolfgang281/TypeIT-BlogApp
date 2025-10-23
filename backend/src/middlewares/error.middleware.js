export const errorMiddleware = (err, req, res, next) => {
  // Clone the error object to avoid mutation side effects
  let error = { ...err };
  error.message = err.message || "Internal Server Error";
  error.statusCode = err.statusCode || 500;

  // --------------------------------------------
  // 1️⃣  Multer Upload Errors
  // --------------------------------------------
  if (err.name === "MulterError") {
    // Examples: LIMIT_FILE_SIZE, LIMIT_UNEXPECTED_FILE, etc.
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        error.message = "File size exceeds the allowed limit.";
        error.statusCode = 400;
        break;
      case "LIMIT_UNEXPECTED_FILE":
        error.message = `Unexpected field received: ${err.field}.`;
        error.statusCode = 400;
        break;
      default:
        error.message = "File upload failed. Please check your file input.";
        error.statusCode = 400;
        break;
    }
  }

  // --------------------------------------------
  // 2️⃣  ImageKit Upload Errors
  // --------------------------------------------
  if (err.message && err.message.includes("ImageKit")) {
    error.message = "Image upload failed. Please try again later.";
    error.statusCode = 500;
  }

  if (
    err.message &&
    (err.message.includes("Invalid transformation") ||
      err.message.includes("The file could not be uploaded"))
  ) {
    error.message = "Invalid image transformation settings.";
    error.statusCode = 400;
  }

  // --------------------------------------------
  // 3️⃣  MongoDB Parsing / Validation Errors
  // --------------------------------------------
  if (err.name === "MongoParseError") {
    error.message = `Invalid MongoDB connection configuration.`;
    error.statusCode = 400;
  }

  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error.statusCode = 400;
  }

  // --------------------------------------------
  // 4️⃣  CastError (Invalid MongoDB ObjectId)
  // --------------------------------------------
  if (err.name === "CastError") {
    error.message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    error.statusCode = 404;
  }

  // --------------------------------------------
  // 5️⃣  Default / Unknown Errors
  // --------------------------------------------
  if (!error.statusCode || error.statusCode >= 500) {
    error.message = error.message || "Internal Server Error";
    error.statusCode = 500;
  }

  // --------------------------------------------
  // 🧾 Send Structured JSON Response
  // --------------------------------------------
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errObj: err,
    errStack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
