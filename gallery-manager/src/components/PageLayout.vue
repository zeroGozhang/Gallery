<template>
  <div class="page-layout-content" :style="!$route.meta.pageHeader ? 'margin-top: -12px' : null">
    <page-header v-if="!$route.meta.pageHeader" :title="title" :logo="logo" :avatar="avatar">
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ desc }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon"/>
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra"></slot>
    </page-header>
    <div class="content">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import PageHeader from './PageHeader';

  export default {
    name: 'LayoutContent',
    components: {
      PageHeader,
    },

    // ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage']

    props: {
      desc: {
        type: String,
        default: null,
      },
      logo: {
        type: String,
        default: null,
      },
      title: {
        type: String,
        default: null,
      },
      avatar: {
        type: String,
        default: null,
      },
      linkList: {
        type: Array,
        default: null,
      },
    },
    methods: {
    },
  };
</script>

<style lang="less" scoped>
.page-layout-content {
  flex: auto;

  .content {
    margin: 24px 24px 0;

    .link {
      margin-top: 16px;

      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;

        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }
  .page-menu-tabs {
    margin-top: 48px;
  }
}
</style>