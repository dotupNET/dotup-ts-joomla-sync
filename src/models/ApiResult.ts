export class ApiResult<T>{
	err_msg: string;
  err_code: string;
  response_id: string;
  api: string;
  version: string;
  data: T;
}