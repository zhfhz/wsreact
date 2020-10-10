export default [
  {
    name: 'SiteList',
    icon: 'iconzhandianliebiao',
    path: '/app/siteList',
    permission: ['COMMON.SITELIST'],
    hideMenu: false,
  },
  {
    name: 'SitesMap',
    icon: 'iconzhandianditu',
    path: '/app/sitesMap',
  },
  {
    name: 'Reports',
    icon: 'iconbaobiaofenxi',
    path: '/reports',
    children: [
      {
        path: '/app/pingUseRate',
        name: 'PingUseRate',
      },
      {
        path: '/app/reportDay',
        name: 'ReportDay',
      },
      {
        path: '/app/reportWeek',
        name: 'ReportWeek',
      },
      {
        path: '/app/reportMonth',
        name: 'ReportMonth',
      },
    ],
  },
  {
    name: 'SendPlan',
    icon: 'iconpeisongjihua',
    path: '/send',
    children: [
      {
        path: '/app/sendArrange',
        name: 'SendArrange',
      },
      {
        path: '/app/sendList',
        name: 'SendList',
        hideChild: true,
        children: [
          {
            path: '/app/sendList/sendListDetail',
            name: 'SendListDetail',
          },
        ],
      },
      {
        path: '/app/pingRecord',
        name: 'PingRecord',
      },
    ],
  },
  {
    name: 'EquipmentCheck',
    icon: 'iconshebeiguanli',
    path: '/equipmentCheck',
    children: [
      {
        path: '/app/dewarPingCheck',
        name: 'DewarPingCheck',
      },
      {
        path: '/app/steelPingCheck',
        name: 'SteelPingCheck',
      },
    ],
  },
  {
    name: 'SystemManager',
    icon: 'iconliebiao',
    path: '/manager',
    children: [
      {
        path: '/manager/user',
        name: 'UserManager',
        hideChild: true,
        children: [
          {
            path: '/manager/user/edit',
            name: 'UserManagerEdit',
          },
          {
            path: '/manager/user/create',
            name: 'UserManagerCreate',
          },
        ],
      },
      {
        path: '/manager/role',
        name: 'RoleManager',
        hideChild: true,
        children: [
          {
            path: '/manager/role/edit',
            name: 'RoleEdit',
          },
          {
            path: '/manager/role/create',
            name: 'RoleCreate',
          },
          {
            path: '/manager/resources/picker',
            name: 'RoleConfig',
          },
        ],
      },
      {
        path: '/manager/resources/edit',
        name: 'ResourcesManager',
        hideChild: true,
        children: [
          {
            path: '/manager/resources/choose',
            name: 'ResourcesMove',
          },
        ],
      },
    ],
  },
  {
    name: 'BusinessMgt',
    icon: 'iconzhandianliebiao',
    permission: ['COMMON.SITELIST'],
    children: [
      {
        path: '/manager/businessMgt/equipmentMgt',
        name: 'EquipmentMgt',
        hideChild: true,
        children: [
          {
            path: '/manager/businessMgt/equipmentAddOrEdit',
            name: 'EquipmentAddOrEdit',
          },
        ],
      },
      {
        path: '/manager/businessMgt/pingSpecificationsMgt',
        name: 'PingSpecificationsMgt',
        // children: [
        //     {
        //         path: '/manager/resources/choose',
        //         name: 'ResourcesMove',
        //     },
        // ],
      },
      {
        path: '/manager/businessMgt/deviceMgt',
        name: 'DeviceMgt',
      },
      {
        path: '/manager/businessMgt/steelPingMgt',
        name: 'SteelPingMgt',
      },
    ],
  },
  {
    name: 'SitesMgt',
    path: '/manager/site',
    icon: 'iconzhandianliebiao',
    hideChild: true,
    children: [
      {
        path: '/manager/site/edit',
        name: 'SiteEdit',
      },
    ],
  },
];
