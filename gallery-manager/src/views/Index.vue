<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <MenuBar :collapsed="collapsed"></MenuBar>
      <a-layout>
        <Header :collapsed="collapsed" @toggle="toggle"></Header>
        <page-layout :desc="description" :title="getTitle" :link-list="linkList" :search="search" :tabs="tabs">
          <route-view ref="content"></route-view>
        </page-layout>
        
        <!-- layout footer -->
        <a-layout-footer style="padding: 0">
          <page-footer />
        </a-layout-footer>
        <!-- <a-layout-content class="main-content">
          <transition name="page-toggle">
            <pag-layout :desc="description" :title="getTitle" :link-list="linkList" :search="search" :tabs="tabs">
              <route-view ref="content"></route-view>
            </pag-layout>
          </transition>
        </a-layout-content> -->
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PageLayout from '@/components/PageLayout';
import Header from '@/components/Header';
import PageFooter from '@/components/PageFooter';
import MenuBar from '@/components/MenuBar';
import RouteView from '@/components/RouteView';

export default {
  data() {
    return {
      title: '',
      description: '',
      linkList: [],
      extraImage: '',
      search: false,
      tabs: {},
      collapsed: false,
    };
  },
  components: {
    PageLayout,
    Header,
    PageFooter,
    MenuBar,
    RouteView,
  },
  computed: {
    sidebarOpened() {
      return this.$store.state.globalSet.sidebar;
    },
    getTitle() {
      return this.$route.meta.title;
    },
  },

  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    },
  },
  
  methods: {
    ...mapActions('globalSet', ['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed;
      this.setSidebar(!this.collapsed);
    },
    getPageHeaderInfo () {
      // eslint-disable-next-line
      this.title = this.getTitle;

      // 因为套用了一层 route-view 所以要取 ref 对象下的子节点的第一个对象

      const content = this.$refs.content && this.$refs.content.$children[0];

      if (content) {
        this.description = content.description;
        this.linkList = content.linkList;
        this.extraImage = content.extraImage;
        this.search = content.search == true ? true : false;
        this.tabs = content.tabs;
      }
    },
  },
  mounted () {
    this.getPageHeaderInfo();
  },
  updated () {
    this.getPageHeaderInfo();
  },
};
</script>

<style>
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}

/* .ant-layout {
  display: -webkit-box !important;
} */

.main-content {
  margin: 24px 16px;
  /* padding: 24px; */
  background: #fff;
  min-height: 80vh;
  position: relative;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #13C2C2;
}

#nprogress .bar {
  background: #13C2C2 !important;
}

.ant-btn {
  border-radius: 4px !important;
}
.ant-card-bordered {
  border-radius: 4px;
}
</style>
