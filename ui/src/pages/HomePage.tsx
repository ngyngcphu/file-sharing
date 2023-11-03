import { useEffect, useState, useRef } from "react";
import { ReactTerminal } from "react-terminal";
import { useUserStore, useFileStore } from "@states";

export function HomePage() {
    const [key, setKey] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { userData } = useUserStore();
    const {
        localStatus,
        fileMetadata,
        uploadFileDataToLocalRepo,
        uploadFileMetadataToServer
    } = useFileStore();

    useEffect(() => {
        if (localStatus === 'SUCCESS') {
            const { sessionId } = userData;
            uploadFileMetadataToServer({
                ...fileMetadata,
                sessionId
            });
        }
    }, [fileMetadata, userData.sessionId, localStatus]);

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
        }
    }

    return (
        <ReactTerminal commands={commands} />
    );
}