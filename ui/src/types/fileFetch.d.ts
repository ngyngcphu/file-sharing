type FileFetchStore = {
    fileFetchStatus: StoreStatus;
    fetchHostNames: (fname: string) => Promise<string[]>;
}