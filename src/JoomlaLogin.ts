import { SyncPullResponse } from './models/SyncPullResponse';
import { TableToSyncRequest } from './models/TableToSyncRequest';
import { IHttpApi } from './IHttpApi';
import { SyncPullRequest } from './models/SyncPullRequest';
import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { JoomlaSettings } from './models/JoomlaSettings';
import { RestResult } from './models/RestResult';

export class JoomlaLogin {
  private deviceId: string = '';
  private logger: ILogger;

  constructor(
    private joomlaSettings: JoomlaSettings,
    private restApi: IHttpApi,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.CreateLogger('JoomlaLogin');
    this.logger.info('constructor()');
  }


  public async Login(user: string, pass: string) {
    let url = this.getServerUrl('login');
    this.logger.debug(url, 'login');
    var result = await this.restApi.post(url, { username: user, password: pass });
    return result;
  }

  private getServerUrl(api: string) {
    let server = this.joomlaSettings.ServerUrl;
    let url = `${server}/index.php?option=com_api&app=ApiUserAuth&resource=${api}`;
    return url;
  }

}
