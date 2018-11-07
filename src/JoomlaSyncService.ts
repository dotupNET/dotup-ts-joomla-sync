import { SyncPullResponse } from './models/SyncPullResponse';
import { TableToSyncRequest } from './models/TableToSyncRequest';
import { IHttpRequest } from './IHttpRequest';
import { SyncPullRequest } from './models/SyncPullRequest';
import { ILogger, LoggerFactory } from "dotup-ts-logger";
import { JoomlaSettings } from './models/JoomlaSettings';
import { ApiResult } from './models/ApiResult';

export class JoomlaSyncService {
  private logger: ILogger;

  constructor(
    private joomlaSettings: JoomlaSettings,
    private restApi: IHttpRequest,
    loggerFactory: LoggerFactory
  ) {
    this.logger = loggerFactory.CreateLogger('JoomlaSyncService');
    this.logger.info('constructor()');
  }

  public async GetTablesToSync(deviceId: string): Promise<ApiResult<TableToSyncRequest>> {
    let url = this.getServerUrl('GetTablesToSync') + '&device=' + deviceId;
    this.logger.debug(url, 'GetTablesToSync');
    let result = await this.restApi.get<ApiResult<TableToSyncRequest>>(url);
    return result;
  }

  public async SyncPullRequest<T>(tableName: string, deviceId: string): Promise<ApiResult<SyncPullRequest<T>>> {
    let url = this.getServerUrl('SyncPullRequest') + '&device=' + deviceId + '&table=' + tableName;
    this.logger.debug(url, 'SyncPullRequest');
    var result = await this.restApi.get<ApiResult<SyncPullRequest<T>>>(url);
    return result;
  }

  public async SyncPullResponse(response: SyncPullResponse) {
    let url = this.getServerUrl('SyncPullResponse');
    this.logger.debug(url, 'SyncPullResponse');
    var result = await this.restApi.post(url, { syncResponse: response });
    return result;
  }

  public async ResetClientState(deviceId: string) {
    let url = this.getServerUrl('ResetClientState') + '&device=' + deviceId;
    this.logger.debug(url, 'ResetClientState');
    var result = await this.restApi.post<ApiResult<any>>(url);
    return result;
  }
  
  private getServerUrl(api: string) {
    let server = this.joomlaSettings.ServerUrl;
    let app = this.joomlaSettings.AppName;
    let url = `${server}/index.php?option=com_api&app=${app}&resource=${api}`;
    return url;
  }

}
