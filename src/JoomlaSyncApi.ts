import { SyncPullResponse } from './models/SyncPullResponse';
import { TableToSyncRequest } from './models/TableToSyncRequest';
import { IHttpApi } from './IHttpApi';
import { SyncPullRequest } from './models/SyncPullRequest';
import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { JoomlaSettings } from './models/JoomlaSettings';
import { RestResult } from './models/RestResult';

export class JoomlaSyncApi {
  private deviceId: string = '';
  private logger: ILogger;

  constructor(
    private joomlaSettings: JoomlaSettings,
    private restApi: IHttpApi,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.CreateLogger('MySqlSyncProvider');
    this.logger.info('constructor()');
    this.deviceId = joomlaSettings.DeviceId;
  }

  public async GetTablesToSync(): Promise<RestResult<TableToSyncRequest>> {
    let url = this.getServerUrl('GetTablesToSync') + '&device=' + this.deviceId;
    this.logger.debug(url, 'GetTablesToSync');
    let result = await this.restApi.get<RestResult<TableToSyncRequest>>(url);
    return result;
  }

  public async SyncPullRequest<T>(tableName: string): Promise<RestResult<SyncPullRequest<T>>> {
    let url = this.getServerUrl('SyncPullRequest') + '&device=' + this.deviceId + '&table=' + tableName;
    this.logger.debug(url, 'SyncPullRequest');
    var result = await this.restApi.get<RestResult<SyncPullRequest<T>>>(url);
    return result;
  }

  public async SyncPullResponse(response: SyncPullResponse) {
    let url = this.getServerUrl('SyncPullResponse');
    this.logger.debug(url, 'SyncPullResponse');
    var result = await this.restApi.post(url, { syncResponse: response });
    return result;
  }

  public async ResetClientState() {
    let url = this.getServerUrl('ResetClientState') + '&device=' + this.deviceId;
    this.logger.debug(url, 'ResetClientState');
    var result = await this.restApi.post<RestResult<any>>(url);
    return result;
  }
  
  private getServerUrl(api: string) {
    let server = this.joomlaSettings.ServerUrl;
    let app = this.joomlaSettings.App;
    let url = `${server}/index.php?option=com_api&app=${app}&resource=${api}`;
    return url;
  }

}
