export default function stringifyError(error: Error) {
  if (error.name === 'NotAllowedError') {
    return 'ERROR: you need to grant camera access permission';
  } else if (error.name === 'NotFoundError') {
    return 'ERROR: no camera on this device';
  } else if (error.name === 'NotSupportedError') {
    return 'ERROR: secure context required (HTTPS, localhost)';
  } else if (error.name === 'NotReadableError') {
    return 'ERROR: is the camera already in use?';
  } else if (error.name === 'OverconstrainedError') {
    return 'ERROR: installed cameras are not suitable';
  } else if (error.name === 'StreamApiNotSupportedError') {
    return 'ERROR: Stream API is not supported in this browser';
  } else if (error.name === 'InsecureContextError') {
    return 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
  } else {
    return `ERROR: Camera error (${error.name})`;
  }
}
