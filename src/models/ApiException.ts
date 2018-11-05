export class ApiException<T>{
	err_msg: string;
	err_code: number;
	response_id: string;
	api: string;
	version: string;
	data: T;
}