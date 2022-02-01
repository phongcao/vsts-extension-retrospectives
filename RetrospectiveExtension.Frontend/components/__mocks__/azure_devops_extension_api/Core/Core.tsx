
import {v4 as uuid} from 'uuid';

export const IdentityDescriptor = {
    identifier: "Mocked Identifier",
    identityType: "Mocked Identifier Type"
};

export const Identity = {
    customDisplayName: "Mocked Custom Display Name",
    descriptor: IdentityDescriptor,
    id: uuid(),
    isActive: true,
    isContainer: false,
    masterId: uuid(),
    memberIds: [],
    memberOf: [],
    members: [],
    metaTypeId: Math.floor(Math.random() * 500),
    providerDisplayName: "Mocked Provider Display Name",
    resourceVersion: Math.floor(Math.random() * 500),
    socialDescriptor: "Mocked Social Descriptor",
    subjectDescriptor: "Mocked Subject Descriptor",
    uniqueUserId: Math.floor(Math.random() * 500),
};

export const Identities = {
    Identity: Identity
};

export const WebApiTeam = {
    id: uuid(),
    name: "Mocked Web API Team",
    url: "mockedUrl",
    description: "Mocked Web API Team Description",
    identity: Identities.Identity,
    identityUrl: "mockedIdentityUrl",
    projectId: uuid(),
    projectName: "Mocked Project Name",
};