class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class constructor
    this.statusCode = statusCode; // Define the statusCode property
  }
}

export default CustomError;
