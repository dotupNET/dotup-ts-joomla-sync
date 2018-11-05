import { SyncMode } from './Enums';
export class TableToSync {
	public RowId: number;
	public TableName: string;
	public LastChange: Date;
	public RowVersoin: string;
	public SyncMode: SyncMode;
	public SyncOrder: number;
}