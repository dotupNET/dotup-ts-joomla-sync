import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { IHttpRequest } from './IHttpRequest';
import { JoomlaSettings } from './models/JoomlaSettings';
import { JoomlaUserModel } from './models/JoomlaUserModel';
import { ApiResult } from './models/ApiResult';

export class JoomlaLoginService {
  private logger: ILogger;

  constructor(
    private restApi: IHttpRequest,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.CreateLogger('JoomlaLoginService');
    this.logger.info('constructor()');
  }


  public async Login(serverUrl: string, user: string, pass: string, deviceId: string): Promise<JoomlaUserModel> {
    const url = this.getServerUrl(serverUrl, 'login');
    this.logger.debug(url, 'login');
    var result = await this.restApi.post<ApiResult<JoomlaUserModel>>(url, { username: user, password: pass, deviceId: deviceId });
    return result.data;
  }

  private getServerUrl(serverUrl: string, api: string) {
    const url = `${serverUrl}/index.php?option=com_api&app=ApiUserAuth&resource=${api}`;
    return url;
  }

}
