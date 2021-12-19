export enum appHeaderOptions {
    home = 'home',
    stake = 'company',
    projects = 'projects',
}

export enum adminSidebarItemOptions {
    dashboard = 'dashboard',
    tier = 'tier',
    project = 'project',
}

export interface LayoutState {
    app: {
        activeHeaderItem: appHeaderOptions;
    };
    admin: {
        isSidebarOpen: boolean;
        activeSidebarItem: adminSidebarItemOptions;
    };
}
