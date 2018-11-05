import { TableToSync } from './TableToSync';
import { ClientSyncState } from './ClientSyncState';
export class TableToSyncRequest{
	
	syncClientState: Array<ClientSyncState>;
	tablesToSync: Array<TableToSync>;
}