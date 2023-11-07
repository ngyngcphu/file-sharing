import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ReactTerminal } from "react-terminal";
import {
    authService,
    fileUploadService,
    fileFetchService,
    fileDeleteService
} from "@services";
import { useUserStore, useFileUploadStore } from "@states";

export function HomePage() {
    const [key, setKey] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { userData, getUserData } = useUserStore();
    const {
        localStatus,
        fileMetadata,
        uploadFileDataToLocalRepo,
        uploadFileMetadataToServer
    } = useFileUploadStore();

    useEffect(() => {
        const handleListFileMetadata = async () => {
            const listFileMetadata = await fileUploadService.getListFileMetadata();
            if (listFileMetadata.length > 0) {
                await fileUploadService.uploadListFileMetadata(
                    {
                        sessionId: userData.sessionId,
                        listFileMetadata: listFileMetadata
                    }
                )
            }
        }

        handleListFileMetadata();
    }, [
        userData.sessionId,
        fileUploadService.getListFileMetadata,
        fileUploadService.uploadListFileMetadata
    ]);

    useEffect(() => {
        if (localStatus === 'SUCCESS') {
            const { sessionId } = userData;
            uploadFileMetadataToServer({
                ...fileMetadata,
                sessionId
            });
        }
    }, [fileMetadata, userData.sessionId, localStatus, uploadFileMetadataToServer]);

    const commands = {
        publish: async (fname: string) => {
            if (fname.trim() === '') {
                return "Please provide <fname> after 'publish'"
            }
            const word = fname.trim().split(' ');
            if (word.length === 1) {
                return (
                    <div>
                        <label htmlFor='dropzone-file'>Select a file:</label>
                        <input
                            key={key}
                            ref={fileInputRef}
                            type='file'
                            id='dropzone-file'
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                if (event.target.files) {
                                    setKey((prevKey) => prevKey + 1);
                                    uploadFileDataToLocalRepo(event.target.files[0], fname);
                                }
                            }}
                        ></input>
                    </div>
                );
            } else {
                return "Invalid 'publish' command. Please use 'publish <fname>' to select a file.";
            }
        },
        unpublish: async (fname: string) => {
            if (fname.trim() === '') {
                return "Please provide <fname> after 'unpublish'"
            }
            const word = fname.trim().split(' ');
            if (word.length === 1) {
                try {
                    await fileDeleteService.delete(fname);
                    await fileDeleteService.markDeleted(userData.sessionId, fname);
                    return 'File is deleted successfully !';
                } catch (err) {
                    return 'File not found!';
                }
            } else {
                return "Invalid 'unpublish' command. Please use 'unpublish <fname>' to remove a file.";
            }
        },
        ls: async (fname: string) => {
            if (fname.trim() === '') {
                return "Please provide <fname> after 'ls'"
            }
            const word = fname.trim().split(' ');
            if (word.length === 1) {
                try {
                    const listHostNames = await fileFetchService.listHostName(fname);
                    return (
                        <div>
                            {listHostNames.map((hostName, index) => (
                                <p key={index}>{hostName}</p>
                            ))}
                        </div>
                    )
                } catch (err) {
                    return 'File not found !'
                }
            } else {
                return "Invalid 'ls' command. Please use 'ls <fname>' to list all of hostnames containing fname.";
            }
        },
        fetch: async (fnameAndHostname: string) => {
            const [fname, hostname] = fnameAndHostname.split(' ');

            if (!fname || !hostname) {
                return "Please provide both <fname> and <hostname> separated by a space after 'fetch'";
            }
            const listHostNames = await fileFetchService.listHostName(fname);
            if (!listHostNames.includes(hostname)) {
                return `Hostname '${hostname}' not found for '${fname}'.`;
            }
            try {
                const response = await axios.get(`http://${hostname}:8080/api/file/${fname}/${hostname}`);
                const fileData = await axios({
                    method: 'get',
                    url: response.data,
                    responseType: 'blob'
                });
                try {
                    await uploadFileDataToLocalRepo(fileData.data, fname);
                    return 'Fetch operation completed';
                } catch (err) {
                    return 'Fetch operation failed';
                }
            } catch (err) {
                return 'Error saving the file';
            }
        },
        logout: async () => {
            await authService.logout({ userId: userData.userId, sessionId: userData.sessionId });
            await getUserData();
        }
    }

    return (
        <ReactTerminal commands={commands} />
    );
}