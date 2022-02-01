import { WorkItem } from './WorkItemTracking';

export function openNewWorkItem(workItemId: number, openInNewTab: boolean) {
    return new Promise((resolve, reject) => resolve(WorkItem));
};

export function openWorkItem(workItemTypeName: string, initialValues?: { [fieldName: string]: Object } ) {
    return new Promise((resolve, reject) => resolve(WorkItem));
};

export const IWorkItemFormNavigationService = {
    openWorkItem: openWorkItem,
    openNewWorkItem: openWorkItem
};

export enum WorkItemTrackingServiceIds {
    WorkItemFormNavigationService = "ms.vss-work-web.work-item-form-navigation-service",
    WorkItemFormService = "ms.vss-work-web.work-item-form"
};

