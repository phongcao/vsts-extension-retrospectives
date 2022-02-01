import {v4 as uuid} from 'uuid';

export const WorkItemBehaviorReference = {
    id: uuid(),
    url: "mockedUrl"
};

export const WitContribution = {
    contributionId: uuid(),
    height: 500,
    inputs: { ["mocked key"] : "mocked value" },
    showOnDeletedWorkItem: true
};

export const BehaviorCreateModel = {
    color: "#C156C8",
    id: uuid(),
    inherits: "mocked inherits",
    name: "mocked name"
};

export const BehaviorModel = {
    abstract: false,
    color: "#C156C8",
    description: "mocked description",
    id: uuid(),
    inherits: WorkItemBehaviorReference,
    name: "mocked name",
    overridden: false,
    rank: Math.floor(Math.random() * 500),
    url: "mockedUrl"
};

export const BehaviorReplaceModel = {
    color: "#C156C8",
    name: "mocked name"
};

export const Control = {
    contribution: WitContribution,
    controlType: "mocked control type",
    height: 500,
    id: uuid(),
    inherited: false,
    isContribution: false,
    label: "mocked label",
    metadata: "mocked metadata",
    order: Math.floor(Math.random() * 10),
    overridden: false,
    readOnly: false,
    visible: true,
    watermark: "mocked watermark"
};

export const Extension = {
    id: uuid()
};

export enum FieldType {
    String = 1,
    Integer = 2,
    DateTime = 3,
    PlainText = 5,
    Html = 7,
    TreePath = 8,
    History = 9,
    Double = 10,
    Guid = 11,
    Boolean = 12,
    Identity = 13,
    PicklistInteger = 14,
    PicklistString = 15,
    PicklistDouble = 16
};

export const PickListMetadataModel = {
    id: uuid(),
    isSuggested: true,
    name: "mocked name",
    type: "mocked type",
    url: "mockedUrl"
};

export const FieldModel = {
    description: "mocked description",
    id: uuid(),
    name: "mocked name",
    pickList: PickListMetadataModel,
    type: FieldType.Boolean,
    url: "mockedUrl"
};

export const FieldUpdate = {
    description: "mocked description",
    id: uuid(),
};

export enum PageType {
    Custom = 1,
    History = 2,
    Links = 3,
    Attachments = 4
};

export const Group = {
    contribution: WitContribution,
    controls: [Control],
    height: 500,
    id: uuid(),
    inherited: false,
    isContribution: false,
    label: "mocked label",
    order: Math.floor(Math.random() * 10),
    overridden: false,
    visible: true,
};

export const Section = {
    groups: [Group],
    id: uuid(),
    overridden: false
};

export const Page = {
    contribution: WitContribution,
    id: uuid(),
    inherited: false,
    isContribution: false,
    label: "mocked label",
    locked: false,
    order: Math.floor(Math.random() * 10),
    overridden: false,
    pageType: PageType,
    sections: [Section],
    visible: true
};

export const FormLayout = {
    extensions: [Extension],
    pages: [Page],
    systemControls: [Control],
};

export enum GetWorkItemTypeExpand {
    None = 0,
    States = 1,
    Behaviors = 2,
    Layout = 4
};

export const HideStateModel = {
    hidden: false
};

export const PickListItemModel = {
    id: uuid(),
    value: "mocked value",
};

export const PickListModel = {
    items: [PickListItemModel],
    id: uuid(),
    isSuggested: true,
    name: "mocked name",
    type: "mocked type",
    url: "mockedUrl",
};

export const WorkItemStateInputModel = {
    color: "#C156C8",
    name: "mocked name",
    order: Math.floor(Math.random() * 10),
    stateCategory: "mocked state category"
};

export const WorkItemStateResultModel = {
    color: "#C156C8",
    hidden: false,
    id: uuid(),
    name: "mocked name",
    order: Math.floor(Math.random() * 10),
    stateCategory: "mocked state category",
    url: "mockedUrl",
}

export const WorkItemTypeBehavior = {
    behavior: WorkItemBehaviorReference,
    isDefault: false,
    url: "mockedUrl"
};

export enum WorkItemTypeClass {
    System = 0,
    Derived = 1,
    Custom = 2
};

export const WorkItemTypeFieldModel = {
    allowGroups: true,
    defaultValue: "mocked default value",
    name: "mocked name",
    pickList: PickListMetadataModel,
    readOnly: false,
    referenceName: "mocked reference name",
    required: false,
    type: FieldType,
    url: "mockedUrl"
};

export const WorkItemTypeFieldModel2 = {
    allowGroups: true,
    defaultValue: "mocked default value",
    name: "mocked name",
    pickList: PickListMetadataModel,
    readOnly: false,
    referenceName: "mocked reference name",
    required: false,
    type: FieldType,
    url: "mockedUrl"
};

export const WorkItemTypeModel = {
    behaviors: [WorkItemTypeBehavior],
    class: WorkItemTypeClass,
    color: "#C156C8",
    description: "mocked description",
    icon: "mocked icon string",
    id: uuid(),
    inherits: "mocked inherits",
    isDisabled: false,
    layout: FormLayout,
    name: "mocked name",
    states: [WorkItemStateResultModel],
    url: "mockedUrl"
};

export const WorkItemTypeUpdateModel = {
    color: "#C156C8",
    description: "mocked description",
    icon: "mocked icon string",
    isDisabled: false
};