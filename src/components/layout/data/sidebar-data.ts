import {
  // IconBarrierBlock,
  // IconBrowserCheck,
  // IconBug,
  // IconError404,
  IconHelp,
  IconLayoutDashboard,
  // IconLock,
  // IconLockAccess,
  // IconMessages,
  // IconNotification,
  // IconPalette,
  // IconServerOff,
  // IconSettings,
  // IconTool,
  // IconUserCog,
  // IconUserOff,
  IconUsers,
  IconCreditCard,
  IconWallet,
} from '@tabler/icons-react'
import { PiggyBank } from 'lucide-react'
import { Command } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin',
    email: 'admin@ajo360.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Ajo360',
      logo: Command,
      plan: '',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
        {
          title: 'Transactions',
          url: '/transactions',
          icon: IconCreditCard,
        },
        {
          title: 'Wallets',
          url: '/wallets',
          icon: IconWallet,
        },
        {
          title: 'Wallet Requests',
          url: '/wallet-requests',
          icon: IconWallet,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Manage Savings',
          url: '/savings',
          icon: PiggyBank,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
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
