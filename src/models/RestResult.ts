export class RestResult<T>{
	err_msg: string;
  err_code: string;
  response_id: string;
  api: string;
  version: string;
  data: T;
}