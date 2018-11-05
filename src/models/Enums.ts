export enum SyncMode {
	None = 0,
	SyncByDate = 1,
	SyncByIds = 2,
	SyncSystem = 4
}

export enum SyncState{
	None = 0,
	StartSync = 1,
	SyncDone = 2, // done ( Must be set by client )
	SyncError = 3

}

export enum SyncDirection {
	None = 0,
	Push = 1,
	Pull = 2,
	PushPull = 3
}