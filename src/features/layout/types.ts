export enum appHeaderOptions {
    home = 'home',
    stake = 'company',
    projects = 'projects',
    myAccount = 'my-account',
    marketplace = 'marketplace',
}

export enum adminSidebarItemOptions {
    dashboard = 'dashboard',
    tier = 'tier',
    project = 'project',
    demoEditor = 'demoEditor',
}

export interface LayoutState {
    app: {
        activeHeaderItem: appHeaderOptions;
        ref: string;
    };
    admin: {
        isSidebarOpen: boolean;
        activeSidebarItem: adminSidebarItemOptions;
    };
}
