class ApiResponse {
  constructor(statusCode, data = null, message = '', success = true) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

 

 
}

export default ApiResponse;