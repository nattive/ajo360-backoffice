import {
  // IconBarrierBlock,
  // IconBrowserCheck,
  // IconBug,
  IconChecklist,
  // IconError404,
  // IconHelp,
  IconLayoutDashboard,
  // IconLock,
  // IconLockAccess,
  // IconMessages,
  // IconNotification,
  IconPackages,
  // IconPalette,
  // IconServerOff,
  // IconSettings,
  // IconTool,
  // IconUserCog,
  // IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Ajo360',
      logo: Command,
      plan: ''
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Accounting',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Wallets',
          url: '/wallets',
          icon: IconChecklist,
        },
        {
          title: 'Savings Plan',
          url: '/savings-plan',
          icon: IconPackages,
        },
        // {
        //   title: 'Chats',
        //   url: '/chats',
        //   badge: '3',
        //   icon: IconMessages,
        // },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    // {
    //  title: 'User Management',
    //  items: [
    //    {
    //      title: 'Users Savings',
    //      url: '/tasks',
    //      icon: IconUsers,
    //    },
    //  ]
      // items: [
      //   {
      //     title: 'Auth',
      //     icon: IconLockAccess,
      //     items: [
      //       {
      //         title: 'Sign In',
      //         url: '/sign-in',
      //       },
      //       {
      //         title: 'Sign In (2 Col)',
      //         url: '/sign-in-2',
      //       },
      //       {
      //         title: 'Sign Up',
      //         url: '/sign-up',
      //       },
      //       {
      //         title: 'Forgot Password',
      //         url: '/forgot-password',
      //       },
      //       {
      //         title: 'OTP',
      //         url: '/otp',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Errors',
      //     icon: IconBug,
      //     items: [
      //       {
      //         title: 'Unauthorized',
      //         url: '/401',
      //         icon: IconLock,
      //       },
      //       {
      //         title: 'Forbidden',
      //         url: '/403',
      //         icon: IconUserOff,
      //       },
      //       {
      //         title: 'Not Found',
      //         url: '/404',
      //         icon: IconError404,
      //       },
      //       {
      //         title: 'Internal Server Error',
      //         url: '/500',
      //         icon: IconServerOff,
      //       },
      //       {
      //         title: 'Maintenance Error',
      //         url: '/503',
      //         icon: IconBarrierBlock,
      //       },
      //     ],
      //   },
      // ],
    // },
    // {
    //   title: 'Other',
    //   items: [
    //     {
    //       title: 'Account Section',
    //       url: '/account-section',
    //       icon: IconPackages,
    //     },
    //     {
    //       title: 'Dispute Management',
    //       url: '/help-center',
    //       icon: IconHelp,
    //     },{
    //       title: 'Support Chat',
    //       url: '/help-center',
    //       icon: IconHelp,
    //     },
    //     // {
    //     //   title: 'Settings',
    //     //   icon: IconSettings,
    //     //   items: [
    //     //     {
    //     //       title: 'Profile',
    //     //       url: '/settings',
    //     //       icon: IconUserCog,
    //     //     },
    //     //     {
    //     //       title: 'Account',
    //     //       url: '/settings/account',
    //     //       icon: IconTool,
    //     //     },
    //     //     {
    //     //       title: 'Appearance',
    //     //       url: '/settings/appearance',
    //     //       icon: IconPalette,
    //     //     },
    //     //     {
    //     //       title: 'Notifications',
    //     //       url: '/settings/notifications',
    //     //       icon: IconNotification,
    //     //     },
    //     //     {
    //     //       title: 'Display',
    //     //       url: '/settings/display',
    //     //       icon: IconBrowserCheck,
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   title: 'Help Center',
    //     //   url: '/help-center',
    //     //   icon: IconHelp,
    //     // },

    //   ],
    // },
  ],
}
