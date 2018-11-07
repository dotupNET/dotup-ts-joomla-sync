import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { IHttpRequest } from './IHttpRequest';
import { JoomlaSettings } from './models/JoomlaSettings';
import { JoomlaUserModel } from './models/JoomlaUserModel';
import { ApiResult } from './models/ApiResult';

export class JoomlaLoginService {
  private logger: ILogger;

  constructor(
    private joomlaSettings: JoomlaSettings,
    private restApi: IHttpRequest,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.CreateLogger('JoomlaLoginService');
    this.logger.info('constructor()');
  }


  public async Login(user: string, pass: string, deviceId: string) : Promise<JoomlaUserModel> {
    let url = this.getServerUrl('login');
    this.logger.debug(url, 'login');
    var result = await this.restApi.post<ApiResult<JoomlaUserModel>>(url, { username: user, password: pass, deviceId: deviceId });
    return result.data;
  }

  private getServerUrl(api: string) {
    let server = this.joomlaSettings.ServerUrl;
    let url = `${server}/index.php?option=com_api&app=ApiUserAuth&resource=${api}`;
    return url;
  }

}
