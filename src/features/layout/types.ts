export enum appHeaderOptions {
    home = 'home',
    stake = 'company',
    projects = 'projects',
}

export enum adminSidebarItemOptions {
    dashboard = 'dashboard',
    tier = 'tier',
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
