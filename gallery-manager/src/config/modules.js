// import authKey from '@/store/authKey';

const modules = [
  {
    name: '测试栏目',
    path: '/test',
    module: 'test',
    current: true,
  },
  {
    name: '测试栏目2',
    path: '/test2',
    module: 'test2',
  },
];

const projectMenus = [
  /**
   *  title: '菜单标题',
   *  icon: '菜单图标',
   *  path: '菜单路由',
   *  invisible: 'boolean, 是否不可见',
   *  children: [子菜单配置]
   * */
  
  {
    title: '相册管理',
    path: '/meetingManage',
    name: 'meetingManage',
    icon: 'bar-chart',
  },
];

const testStatusList = [
  { label: '关闭', value: 0 },
  { label: '开启', value: 1 },
];

export {
  modules,
  projectMenus,
  testStatusList,
};
