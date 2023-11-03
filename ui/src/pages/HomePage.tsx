import { useMemo, useState } from "react";
import { ReactTerminal } from "react-terminal";
import { useFileStore } from "@states";

export function HomePage() {
    const [fname, setFname] = useState<string>('');
    const { uploadFile } = useFileStore();

    const handleUploadDocument = useMemo(
        () => async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                await uploadFile(event.target.files[0], fname);
            }
        },
        [uploadFile]
    );

    const commands = {
        publish: async (fname: string) => {
            if (fname.trim() === '') {
                return "Please provide <fname> after 'publish'"
            }
            const word = fname.trim().split(' ');
            if (word.length === 1) {
                setFname(fname);
                return (
                    <div>
                        <label htmlFor='dropzone-file'>Select a file:</label>
                        <input
                            type='file'
                            id='dropzone-file'
                            onChange={handleUploadDocument}
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