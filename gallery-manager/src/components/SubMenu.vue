<template functional>
  <a-sub-menu v-on="listeners" :key="data.key">
    <span slot="title"><a-icon type="mail" /><span>{{ data.attrs.menuInfo.title }}</span></span>
    <template v-for="(item, cIndex) in data.attrs.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.path || `submenu_${cIndex}`">
        <Router-link :to="{path: item.path}">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
        </Router-link>
      </a-menu-item>
      <sub-menu v-else :menuInfo="item" :key="item.path || `subitem_${cIndex}`"/>
    </template>
  </a-sub-menu>
</template>
