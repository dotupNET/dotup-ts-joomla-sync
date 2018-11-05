import { ClientSyncState } from "./ClientSyncState";
import { TableToSync } from "./TableToSync";

export class SyncPullRequest<T>{
	syncClientState: ClientSyncState;
	tableData: Array<T>;
}