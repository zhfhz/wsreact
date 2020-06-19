import menus  from '@/config/menus.config';

const SUPPOER_LOCALES = [
    {
        name: "Language",
        value: ""
    },
    {
        name: "English",
        value: "en-US"
    },
    {
        name: "繁體中文",
        value: "zh-TW"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    }
];
export default {
    namespace: "global",
    state: {
        siderCollapsed: localStorage.getItem('global_sider_collapsed') === 'true' ,
        navMenus: menus,
        locales: SUPPOER_LOCALES,
    },
    effects: {},
    reducers: {
        siderTrigger(state) {
            const { siderCollapsed } = state;
            localStorage.setItem('global_sider_collapsed', `${!siderCollapsed}`);
            return {
                ...state,
                siderCollapsed: !siderCollapsed
            };
        },
        onSelectLocale(state, { payload }) {
            location.search = payload ? `?lang=${payload}` : '';
            return state;
        }
    },
    subscribe: {}
}