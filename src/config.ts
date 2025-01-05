export type ConfigProps = {
    Sidebar_drawer: any;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    setHorizontalLayout: boolean;
    setRTLLayout: boolean;
    actTheme: string;
    boxed: boolean;
    setBorderCard: boolean;
};


export const channelUrl: any = {
    '1':'rx.sampleglobal.io/user/#/medium?d=',
    '2':'rx.sampleglobal.io/user/#/medium?d=',
    '4':'https://survey.sampleglobal.io/efficient/fast/',
    'common':'https://survey.sampleglobal.io/efficient/fast/'
};

const config: ConfigProps = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    mini_sidebar: false,
    setHorizontalLayout: false, // Horizontal layout
    setRTLLayout: false, // RTL layout
    actTheme: 'DARK_BLUE_THEME',
    boxed: true,
    setBorderCard: false
};

export const flow: any = {
    'IPIDEA':{
        name:'IPIDEA',
        api:'e3954635a37ce335.lqz.na.ipidea.online',
        port:'2333',
        account:'belj506',
        password:'belj506',
    }
};

export const ossUrl: any = 'https://gyh7790.oss-cn-beijing.aliyuncs.com'





export default config;