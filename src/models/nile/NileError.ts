type NileError = {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  message?: string;
  requestId: string;
  trace: string;
}

export default NileError;
