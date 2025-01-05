import type { LeaderType, TemplateType, ThemeFeatures, PackageType, FooterType, Feature } from '@/types/components/front-pages/index';
import type { faqPageType } from '@/types/components/pages/faqData';

import review1 from '@/assets/images/profile/user-1.jpg';
import review2 from '@/assets/images/profile/user-2.jpg';

const Features: Feature[] = [
    {
        icon: 'tabler:chart-bubble',
        title: 'Expert Advisor',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'lighterror',
        color: 'error'
    },
    {
        icon: 'tabler:building-store',
        title: 'Effective Support',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'lightprimary',
        color: 'primary'
    },
    {
        icon: 'material-symbols:category-outline',
        title: 'Low Fees',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'lightsuccess',
        color: 'success'
    },
    {
        icon: 'material-symbols:earthquake',
        title: 'Loan Facility',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'grey100',
        color: 'dark '
    }
];

const AboutFeatures: Feature[] = [
    {
        icon: 'tabler:building-store',
        title: 'Effective Support',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'lightprimary',
        color: 'primary'
    },
    {
        icon: 'tabler:chart-bubble',
        title: 'Expert Advisor',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'lighterror',
        color: 'error'
    },
    {
        icon: 'material-symbols:category-outline',
        title: 'Low Fees',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'lightsuccess',
        color: 'success'
    },
    {
        icon: 'material-symbols:earthquake',
        title: 'Loan Facility',
        subtitle: 'Suspendisse vestibulum eu erat ac scelerisque.',
        bgcolor: 'bglight',
        color: 'bgdark '
    }
];

const QA1: faqPageType[] = [
    {
        question: 'Combine teammate schedules',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Factor in outside colleagues',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Round robin pooling',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    }
];
const QA2: faqPageType[] = [
    {
        question: 'Combine teammate schedules 2',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Factor in outside colleagues',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Round robin pooling',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    }
];
const QA3: faqPageType[] = [
    {
        question: 'Combine teammate schedules 3',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Factor in outside colleagues',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Round robin pooling',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    }
];

const QA4: faqPageType[] = [
    {
        question: 'Combine teammate schedules 4',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Factor in outside colleagues',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    },
    {
        question: 'Round robin pooling',
        answer: 'Factor in availability for required attendees, and skip checking for conflicts for optional attendees.'
    }
];

// OurLeaders
import leader1 from '@/assets/images/front-pages/leaders/leader1.png';
import leader2 from '@/assets/images/front-pages/leaders/leader2.png';
import leader3 from '@/assets/images/front-pages/leaders/leader3.png';
import leader4 from '@/assets/images/front-pages/leaders/leader4.png';
import {
    WandIcon,
    ShieldLockIcon,
    ArchiveIcon,
    AdjustmentsIcon,
    TagIcon,
    DiamondIcon,
    DatabaseIcon,
    LanguageKatakanaIcon,
    BuildingCarouselIcon,
    ArrowsShuffleIcon,
    ChartPieIcon,
    LayersIntersectIcon,
    RefreshIcon,
    BookIcon,
    CalendarIcon,
    MessageIcon,
} from 'vue-tabler-icons';
const OurLeaders: LeaderType[] = [
    {
        img: leader1,
        name: 'Alex Martinez',
        position: 'CEO & Co-Founder'
    },
    {
        img: leader2,
        name: 'Jordan Nguyen',
        position: 'CTO & Co-Founder'
    },
    {
        img: leader3,
        name: 'Taylor Roberts',
        position: 'Product Manager'
    },
    {
        img: leader4,
        name: 'Morgan Patel',
        position: 'Lead Developer'
    }
];

const templateText: TemplateType[] = [
    {
        title: 'High Customizability',
        subtitle:
            'Tailor the dashboard to your exact needs. Customize layouts, color schemes, and widgets effortlessly for a personalized user experience.'
    },
    {
        title: 'Powerful Data Analytics',
        subtitle:
            ' Unlock the true potential of your data with our advanced analytics tools. Gain valuable insights and make data-driven decisions with ease.'
    },
    {
        title: 'Interactive Graphs & Charts',
        subtitle:
            'Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.'
    }
];

const ThemeFeature1: ThemeFeatures[] = [
    {
        icon: WandIcon,
        title: 'Lootably',
        color: 'primary'
    },
    {
        icon: ShieldLockIcon,
        title: 'PollfishPlus',
        color: 'secondary'
    },
    {
        icon: ArchiveIcon,
        title: 'BitlabsOfferwall',
        color: 'error'
    },
    {
        icon: AdjustmentsIcon,
        title: 'Adgate',
        color: 'success'
    },
    {
        icon: TagIcon,
        title: 'Inbrain',
        color: 'info'
    },
    {
        icon: DiamondIcon,
        title: 'YS',
        color: 'warning'
    }
];
const ThemeFeature2: ThemeFeatures[] = [
    {
        icon: DatabaseIcon,
        title: 'prime',
        color: 'success'
    },
    {
        icon: LanguageKatakanaIcon,
        title: 'Panelanb',
        color: 'error'
    },
    {
        icon: BuildingCarouselIcon,
        title: 'bib',
        color: 'warning'
    },
    {
        icon: ArrowsShuffleIcon,
        title: 'marketxcel',
        color: 'primary'
    }
];
const ThemeFeature3: ThemeFeatures[] = [
    {
        icon: ChartPieIcon,
        title: 'Notik',
        color: 'secondary'
    },
    {
        icon: LayersIntersectIcon,
        title: 'Panel',
        color: 'info'
    },
    {
        icon: RefreshIcon,
        title: 'Sasple',
        color: 'error'
    },
    {
        icon: BookIcon,
        title: 'eliteopinio',
        color: 'warning'
    },
    {
        icon: CalendarIcon,
        title: 'Meeduo',
        color: 'success'
    },
    {
        icon: MessageIcon,
        title: 'sample',
        color: 'info'
    }
];

const Packages: PackageType[] = [
    {
        tagtext: false,
        caption: 'Single Use',
        subtext: 'Use for single end product which end users can’t be charged for.',
        price: 49,
        period: 'one time pay',
        buttontext: 'Purchase Now',
        url: '/',
        list: [
            {
                listtitle: 'Full source code',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Documentation',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Use in SaaS app',
                status: true,
                icon: true,
                disable: true
            },
            {
                listtitle: '<b>One</b> Project',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: '<b>One Year</b> Technical Support',
                status: false,
                icon: true,
                disable: false
            }
        ]
    },

    {
        tagtext: false,
        caption: 'Multiple Use',
        subtext: 'Use for unlimited end products end users can’t be charged for.',
        price: 89,
        period: 'one time pay',
        buttontext: 'Purchase Now',
        url: '/',
        list: [
            {
                listtitle: 'Full source code',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Documentation',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Use in SaaS app',
                status: true,
                icon: true,
                disable: true
            },
            {
                listtitle: '<b>Unlimited</b> Project',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: '<b>One Year</b> Technical Support',
                status: false,
                icon: true,
                disable: false
            }
        ]
    },

    {
        tagtext: true,
        caption: 'Extended Use',
        subtext: 'Use for single end product which end users can be charged for.',
        price: 299,
        period: 'one time pay',
        buttontext: 'Purchase Now',
        url: '/',
        list: [
            {
                listtitle: 'Full source code',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Documentation',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Use in SaaS app',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: '<b>One</b> Project',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: '<b>One Year</b> Technical Support',
                status: false,
                icon: true,
                disable: false
            }
        ]
    },
    {
        tagtext: false,
        caption: 'Unlimited Use',
        subtext: 'Use in unlimited end products end users can be charged for.',
        price: 499,
        period: 'one time pay',
        buttontext: 'Purchase Now',
        url: '/',
        list: [
            {
                listtitle: 'Full source code',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Documentation',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: 'Use in SaaS app',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: '<b>Unlimited</b> Project',
                status: false,
                icon: true,
                disable: false
            },
            {
                listtitle: '<b>One Year</b> Technical Support',
                status: false,
                icon: true,
                disable: false
            }
        ]
    }
];

const FAQData: TemplateType[] = [
    {
        title: 'Is it free to access paid surveys?',
        subtitle:
            'Yes, it is free to register at RewardingWays and there is no cost to access our best paid surveys. \n Hundreds of surveys available each day from legitimate survey companies.'
    },
    {
        title: 'How do I start taking paid online surveys?',
        subtitle:
            'Simply log in, or sign up to receive your sign up bonus, and visit our "Online Paid Surveys" section. \n We partner with a number of the best paid survey sites and aim to become your favourite paid surveys website !'
    },
    {
        title: 'What kind of surveys are available?',
        subtitle:
            'Find surveys on a variety of subjects. Market research companies require feedback on a variety of topics such as products, services, brands, healthcare, politics, shopping habits, leisure time and more.'
    },
    {
        title: 'How do I get paid for taking surveys?',
        subtitle:
            'Complete surveys for cash and prizes. Once you complete simple surveys, the reward is sent to your System account'
    },
    {
        title: 'How much do I get paid per survey?',
        subtitle:
            'Survey payments vary for each survey. It can range between $0.50 and $15.00 per survey. How much does online surveys pay will generally vary depending on the length of the survey and srvey company. We always aim to provide the best online survey rewards possible for each market research firm. Start getting paid for opinions.'
    }
];

// Footer Menu Links
const FooterMenu1: FooterType[] = [
    {
        menu: 'Cards',
        link: '/widgets/cards'
    },
    {
        menu: 'Pricing',
        link: '/pages/pricing'
    },
    {
        menu: 'Account Settings',
        link: '/pages/account-settings'
    },
    {
        menu: 'FAQ',
        link: '/pages/faq'
    },
    {
        menu: 'Search Results',
        link: '/pages/search-results'
    }
];
const FooterMenu2: FooterType[] = [
    {
        menu: 'Treeview',
        link: '/auth/login'
    },
    {
        menu: 'Banners',
        link: '/auth/login'
    },
    {
        menu: 'Charts',
        link: '/auth/login'
    },
    {
        menu: 'Gallery Lightbox',
        link: '/auth/login'
    },
    {
        menu: 'Social Contacts',
        link: '/auth/login'
    }
];
const FooterMenu3: FooterType[] = [
    {
        menu: 'Form Layout',
        link: '/auth/login'
    },
    {
        menu: 'Tables',
        link: '/auth/login'
    },
    {
        menu: 'Stepper',
        link: '/auth/login'
    },
    {
        menu: 'Datatables',
        link: '/auth/login'
    },
    {
        menu: 'Validation',
        link: '/auth/login'
    }
];

const userReviewFrront: any = [
    {
        img: review1,
        title: 'Jenny Wilson',
        subtitle: 'CEO & Head of Comp Inc.',
        review: 'Simply by voicing your opinions on current affairs, what washing-up liquid you use or what TV you prefer to watch, you can put some extra money in your back pocket just by using a paid surveys app.'
    },
    {
        img: review2,
        title: 'Josh Cui',
        subtitle: 'CEO & Head of Comp Inc.',
        review: 'Online surveys usually pay 50-500 coins and take 3-25 minutes. Higher-paying surveys, offering 1000 coins or more, are available for specific demographics, making it a fun way to earn by sharing your opinions!'
    }
];
export {
    QA1,
    QA2,
    QA3,
    QA4,
    OurLeaders,
    templateText,
    ThemeFeature1,
    ThemeFeature2,
    ThemeFeature3,
    Packages,
    FAQData,
    FooterMenu1,
    FooterMenu2,
    FooterMenu3,
    Features,
    userReviewFrront,
    AboutFeatures
};
