import {v4 as uuid} from 'uuid';

export const WorkItemRelation = {
    attributes: { ["Mocked attribute key"] : "Mocked attribute value" },
    rel: "Mocked rel",
    url: "mockedUrl"
};

export const WorkItemCommentVersionRef = {
    commentId:  Math.floor(Math.random() * 500),
    createdInRevision:  Math.floor(Math.random() * 500),
    isDeleted: false,
    text: "Mocked comment text",
    version:  Math.floor(Math.random() * 500),
    url: "mockedUrl"
}

export const WorkItem = {
    commentVersionRef: WorkItemCommentVersionRef,
    fields: { ["Mocked Field"] : "Mocked Field value" },
    id: Math.floor(Math.random() * 500),
    relations: [WorkItemRelation],
    rev: Math.floor(Math.random() * 500),
    _links:['']
};

export const WorkItemIcon = {
    id: uuid(),
    url: "mockedUrl"
};

export const WorkItemStateTransition = {
    actions: ["mock one", "mock two"],
    to: "sample next state"
};

export const WorkItemStateColor = {
    category: "mocked category",
    color: "#008000",
    name: "mocked name"
};

export const WorkItemFieldReference = {
    name: "mocked name",
    referenceName: "mocked reference name",
    url: "mockedUrl"
};

export const WorkItemTypeFieldInstance = {
    allowedValues: ["sample allowed value", "sample second allowed value"],
    defaultValue: "mocked default value",
    alwaysRequired: false,
    dependentFields: [WorkItemFieldReference],
    helpText: "mocked help text",
    name: "mocked name",
    referenceName: "mocked reference name",
    url: "mockedUrl"
};

export const WorkItemType = {
    color: "#008000",
    description: "mocked description",
    fieldInstances: [WorkItemTypeFieldInstance],
    fields: [WorkItemTypeFieldInstance],
    icon: WorkItemIcon,
    isDisabled: false,
    name: "mocked name",
    referenceName: "mocked reference name",
    states: [WorkItemStateColor],
    transitions: { ["mockedTransition"] : [WorkItemStateTransition] },
    xmlForm: "mocked XML",
    __links: [''],
    url: "mockedUrl"
}

export const WorkItemTypeReference = {
    name: "mocked name",
    url: "mockedUrl"
};