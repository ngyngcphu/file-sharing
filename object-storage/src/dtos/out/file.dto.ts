import { Static, Type } from '@sinclair/typebox';

export const FileDto = Type.Object({
    etag: Type.String(),
    versionId: Type.String()
});

export type FileDto = Static<typeof FileDto>;
