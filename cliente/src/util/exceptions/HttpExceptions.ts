export default class HttpException extends Error {
  status: number;
  message: string;
  constructor( message: string, name: string = "HttpException",status: number = 500) {
    super(message);
    this.status = status;
    this.name = name;
    this.message = message;

  }
}


export class DBException extends HttpException {

  constructor(message: string, status: number) {
    super( message, "DBException",status);
  }
}



export class StreamException extends HttpException {

  constructor(message: string, status: number) {
    super( message, "StreamException",status);
  }
}


