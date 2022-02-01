import {v4 as uuid} from 'uuid';

export const IdentityRef = {
    directoryAlias: "mocked directory alias",
    id: uuid(),
    imageUrl: "mockedImageUrl",
    inactive: false,
    isAadIdentity: false,
    isContainer: false,
    isDeletedInOrigin: false,
    profileUrl: "mockedProfileUrl",
    uniqueName: "mocked unique name",
    _links: ["mocked link"],
    descriptor: "mocked descriptor",
    displayName: "mocked display name",
    url: "mockedUrl"
};

export const JsonPatchDocument = {
};

export const JsonWebToken = {
};

export enum Operation {
    Add = 0,
    Remove = 1,
    Replace = 2,
    Move = 3,
    Copy = 4,
    Test = 5
}

export interface TeamMember {
    identity: {IdentityRef: any},
    isTeamAdmin: false,
};