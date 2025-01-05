export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    // {
    //     title: 'Dashboard',
    //     icon: 'screencast-2-linear',
    //     BgColor: 'primary',
    //     to: '/dashboard1'
    // },
    {
        title: 'Dashboard',
        icon: 'screencast-2-linear',
        BgColor: 'success',
        to: '/dashboard'
    },
    {
        title: 'Earn',
        icon: 'socket-outline',
        BgColor: 'primary',
        to: '/pages/earn'
    },
    {
        title: 'Record',
        icon: 'documents-minimalistic-linear',
        BgColor: 'primary',
        to: '/pages/record'
    },
    {
        title: 'Account',
        icon: 'settings-minimalistic-line-duotone',
        BgColor: 'success',
        to: '/pages/account-settings'
    },
    { header: 'Apps' },
    {
        title: 'Notice',
        icon: 'align-vertical-spacing-line-duotone',
        BgColor: 'warning',
        to: '/apps/posts',
    },
    { header: 'Other' },
    {
        title: 'FAQ',
        icon: 'question-circle-line-duotone',
        BgColor: 'error',
        to: '/pages/faq'
    },
];

export default sidebarItem;
