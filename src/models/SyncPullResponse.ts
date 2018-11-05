import { SyncState } from './Enums';
export class SyncPullResponse {
	DeviceId: string = "";
	TableName: string = "";
	State: SyncState = SyncState.None;
	SyncedFrom?: Date;
	SyncedTo?: Date;
	SyncedTableChangesRowId: string = "";
	CurrentSyncId: string = "";
	InsertedRows:number = 0;
	UpdatedRows:number = 0;
	DeletedRows:number = 0;
	Error: string = "";
  Duration: string = "";
	
}