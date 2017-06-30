<template>
  <nav class="phytoplankton-menu js-phytoplankton-menu">
    <ul class="phytoplankton-menu__list"
        v-for="item in items">
      <li class="phytoplankton-menu__list__item">
        <div class="phytoplankton-menu__list__item__header">{{ item.title }}</div>
        <ul class="phytoplankton-menu__list">
          <li class="phytoplankton-menu__list__item"
              @click="goToFile"
              v-for="url in item.url">
            <router-link
              class="phytoplankton-menu__list__item__subheader"
              :to="url"
              active-class="is-active"
              v-text="url">
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import phytoplanktonConfig from '../config'

export default {
  name: 'phytoplankton-menu',
  data () {
    return {
      items: phytoplanktonConfig.menu
    }
  },
  methods: {
    goToFile: function (e) {
      return
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .phytoplankton-menu {
    background-color: #009688;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    position: relative;
    z-index: 1;
    bottom: 0;
    color: #fff;
    font-size: 16px;
    line-height: 19.2px;
    font-size: 1rem;
    line-height: 1.2rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    top: 0;
    width: 25%;
    z-index: 6;
  }
  .phytoplankton-menu::-webkit-scrollbar {
    width: 6px;
  }
  .phytoplankton-menu::-webkit-scrollbar-track {
    background-color: #eaeaea;
  }
  .phytoplankton-menu::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #ccc;
  }
  .phytoplankton-menu::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
  }
  @media screen and (max-width: 700px) {
    .phytoplankton-menu {
      transform: translate3d(-100%, 0, 0);
      transition: all .25s ease-in-out;
      width: 75%;
    }
    .phytoplankton-menu.is-active {
      transform: translate3d(0, 0, 0);
    }
  }
  @media screen and (max-width: 700px) and (orientation: landscape) {
    .phytoplankton-menu {
      width: 50%;
    }
  }

  .phytoplankton-menu ul,
  .phytoplankton-menu li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 700px) {
    .phytoplankton-menu > ul > li {
      font-size: 20px;
      line-height: 24px;
      font-size: 1.25rem;
      line-height: 1.5rem;
    }
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li a {
    color: #00796b;
    padding: 12px 24px;
    padding: 0.75rem 1.5rem;
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li a:hover {
    text-decoration: underline;
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li.active > a {
    cursor: default;
    font-weight: bold;
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li.active > a:hover {
    text-decoration: none;
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li > ul > li > a {
    padding-left: 48px;
    padding-left: 3rem;
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li > ul > li.active > a {
    color: #00796b;
    cursor: default;
    font-weight: bold;
  }
  .phytoplankton-menu > ul > li > ul > li > ul > li > ul > li.active > a:hover {
    text-decoration: none;
  }

  .phytoplankton-menu__list__item a {
    display: block;
    text-decoration: none;
  }

  .phytoplankton-menu__list__item__header {
    font-family: "Oxygen", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    font-size: 1.25rem;
    line-height: 1.5rem;
    padding: 24px;
    padding: 1.5rem;
    text-transform: uppercase;
  }

  .phytoplankton-menu__list__item__subheader {
    color: #b2dfdb;
    font-size: 18px;
    line-height: 21.6px;
    font-size: 1.125rem;
    line-height: 1.35rem;
    font-family: "Oxygen", "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 24px;
    padding: 1.5rem;
    position: relative;
  }
  .phytoplankton-menu__list__item__subheader .svg-icon,
  .phytoplankton-menu__list__item__subheader span {
    display: inline-block;
    vertical-align: baseline;
    zoom: 1;
    *display: inline;
    *vertical-align: auto;
    vertical-align: middle;
  }
  .phytoplankton-menu__list__item__subheader .svg-icon {
    height: 24px;
    height: 1.5rem;
    width: 24px;
    width: 1.5rem;
  }
  .phytoplankton-menu__list__item__subheader .svg-icon path,
  .phytoplankton-menu__list__item__subheader .svg-icon plygon,
  .phytoplankton-menu__list__item__subheader .svg-icon rect {
    fill: #b2dfdb;
  }
  .phytoplankton-menu__list__item__subheader span {
    margin-left: 8px;
    margin-left: 0.5rem;
  }
  .phytoplankton-menu__list__item__subheader:hover {
    color: #fff;
  }
  .phytoplankton-menu__list__item__subheader:hover .svg-icon path,
  .phytoplankton-menu__list__item__subheader:hover .svg-icon plygon,
  .phytoplankton-menu__list__item__subheader:hover .svg-icon rect {
    fill: #fff;
  }
  .phytoplankton-menu__list__item__subheader.is-active, .phytoplankton-menu__list__item__subheader:active {
    background-color: #00796b;
    color: #fff;
    cursor: default;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    position: relative;
    z-index: 1;
  }
  .phytoplankton-menu__list__item__subheader.is-active .svg-icon path,
  .phytoplankton-menu__list__item__subheader.is-active .svg-icon plygon,
  .phytoplankton-menu__list__item__subheader.is-active .svg-icon rect, .phytoplankton-menu__list__item__subheader:active .svg-icon path,
  .phytoplankton-menu__list__item__subheader:active .svg-icon plygon,
  .phytoplankton-menu__list__item__subheader:active .svg-icon rect {
    fill: #fff;
  }

  ul[data-gumshoe] {
    background-color: #fff;
    padding: 12px 0px;
    padding: 0.75rem 0rem;
  }
</style>
