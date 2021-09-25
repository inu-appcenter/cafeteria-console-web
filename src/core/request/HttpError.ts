export default class HttpError extends Error {
  constructor(readonly error: string, readonly message: string) {
    super(message);
  }
}
