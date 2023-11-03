type FileFetchStore = {
    fileFetchStatus: StoreStatus;
    listHostNames: string[];
    fetchHostNames: (fname: string) => Promise<string[]>;
}