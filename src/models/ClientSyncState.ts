import { SyncState } from "./Enums";

export class ClientSyncState {
	DeviceId: string;
	TableName: string;
	State: SyncState;
	SyncedFrom: Date;
	SyncedTo: Date;
	SyncedTableChangesRowId: string;
	CurrentSyncFrom: Date;
	CurrentSyncTo: Date;
	CurrentTableChangesRowId: string;
	CurrentSyncId: string;
}