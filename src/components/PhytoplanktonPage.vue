<template>
  <main class="phytoplankton-page js-phytoplankton-page">
    <div class="phytoplankton-page__item" v-for="block in blocks" v-html="block.docs"></div>
  </main>
</template>

<script>
var marked = require('marked')
import separate from '../scripts/separate'
import removeComments from '../scripts/removeComments'
import computeCss from '../scripts/computeCss'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  name: 'phytoplankton-page',
  data () {
    return {
      // url: './styleguide' + this.$route.path,
      url: '../../static/styleguide' + this.$route.path,
      // url: require('../styleguide/readme.css'),
      headings: [],
      blocks: []
    }
  },
  beforeCreate: function () {
    console.log('beforeCreate')
  },
  created: function () {
    console.log('created')
  },
  mounted: function () {
    console.log('mounted')
    // console.log(this.$el)
    this.loadFile()
    console.log(this.blocks)
  },
  updated: function () {
    console.log('updated')
  },
  methods: {
    removeStyles: function () {
      var styles = document.head.querySelectorAll('style')
      if (styles.length) {
        for (var i = 0; i < styles.length; i++) {
          styles[i].parentNode.removeChild(styles[i])
        }
      }
    },
    getHeadings: function (block) {
      var match
      var regex = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/gm
      while ((match = regex.exec(block.docs)) !== null) {
        this.headings.push(match[0])
      }
    },
    loadFile: function () {
      // Resets
      // this.blocks = []
      // this.headings = []
      // this.removeStyles()

      this.$http.get(this.url).then(response => {
        // get body data
        var blocks = separate(response.body)

        for (var i = 0; i < blocks.length; i++) {
          var tokens = marked.lexer(blocks[i].docs)
          var links = tokens.links || {}
          var block = {
            docs: [],
            code: ''
          }

          this.getHeadings(blocks[i])

          var cleanCode = removeComments(blocks[i].code)
          if (cleanCode !== '') {
            block.code = computeCss(cleanCode)
          }

          for (var j = 0; j < tokens.length; j++) {
            switch (tokens[j].type) {
              case 'code':
                if (!tokens[j].lang) {
                  block.docs.push(tokens[j])
                } else if (tokens[j].lang === 'markup') {
                  block.docs.push({
                    type: 'html',
                    lang: 'markup',
                    text: '<ul class="phytoplankton-tabs">' +
                          '<li class="phytoplankton-tabs__item is-active">HTML</li>' +
                          '</ul>' +
                          '<div class="code-render clearfix">' + tokens[j].text + '</div>'
                  })
                }
                break
              default:
                block.docs.push(tokens[j])
                break
            }
          }

          block.docs.links = links
          block.docs = marked.parser(block.docs)
          this.blocks.push(block)
        }
      }, response => {
        // error callback
      })

      // var rq = new XMLHttpRequest()

      // rq.onreadystatechange = function (page) {
      //   if (this.readyState === XMLHttpRequest.DONE) {
      //     if (this.status === 200) {
      //       var blocks = separate(this.responseText)

      //       for (var i = 0; i < blocks.length; i++) {
      //         var tokens = marked.lexer(blocks[i].docs)
      //         var links = tokens.links || {}
      //         var block = {
      //           docs: [],
      //           code: ''
      //         }

      //         page.getHeadings(blocks[i])

      //         var cleanCode = removeComments(blocks[i].code)
      //         if (cleanCode !== '') {
      //           block.code = computeCss(cleanCode)
      //         }

      //         for (var j = 0; j < tokens.length; j++) {
      //           switch (tokens[j].type) {
      //             case 'code':
      //               if (!tokens[j].lang) {
      //                 block.docs.push(tokens[j])
      //               } else if (tokens[j].lang === 'markup') {
      //                 block.docs.push({
      //                   type: 'html',
      //                   lang: 'markup',
      //                   text: '<ul class="phytoplankton-tabs">' +
      //                         '<li class="phytoplankton-tabs__item is-active">HTML</li>' +
      //                         '</ul>' +
      //                         '<div class="code-render clearfix">' + tokens[j].text + '</div>'
      //                 })
      //               }
      //               break
      //             default:
      //               block.docs.push(tokens[j])
      //               break
      //           }
      //         }

      //         block.docs.links = links
      //         block.docs = marked.parser(block.docs)
      //         page.blocks.push(block)
      //       }
      //     } else {
      //       alert('Request Failed!\n\nEither the file the extension *(.css, .stylus, .styl, .less, .sass, .scss)* in `config.menu.url` is missing or the file just doesn\'t exist.')
      //       // return
      //       // loader.message = '**Request Failed!**\n\nEither the file the extension *(.css, .stylus, .styl, .less, .sass, .scss)* in `config.menu.url` is missing or the file just doesn\'t exist.';
      //       // loader.message = marked(loader.message);
      //     }
      //   }
      // }.bind(rq, this)

      // rq.open('GET', this.url)
      // rq.send()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .phytoplankton-page {
    background-color: #fff;
    float: right;
    padding-left: 64px;
    padding-left: 4rem;
    padding-top: 24px;
    padding-top: 1.5rem;
    padding-right: 64px;
    padding-right: 4rem;
    width: 75%;
  }
  @media screen and (max-width: 700px) {
    .phytoplankton-page {
      margin-top: 60px;
      margin-top: 3.75rem;
      padding-left: 24px;
      padding-left: 1.5rem;
      padding-right: 24px;
      padding-right: 1.5rem;
      transform: translate3d(0, 0, 0);
      transition: all .25s ease-in-out;
      width: 100%;
    }
    .phytoplankton-page.is-active {
      transform: translate3d(75%, 0, 0);
    }
  }
  @media screen and (max-width: 700px) and (orientation: landscape) {
    .phytoplankton-page.is-active {
      transform: translate3d(50%, 0, 0);
    }
  }

  .phytoplankton-page p,
  .phytoplankton-page ul,
  .phytoplankton-page ol,
  .phytoplankton-page pre,
  .phytoplankton-page table,
  .phytoplankton-page blockquote {
    margin-bottom: 22px;
    margin-top: 22px;
    margin-bottom: 1.375rem;
    margin-top: 1.375rem;
  }
  .phytoplankton-page p a,
  .phytoplankton-page ol a,
  .phytoplankton-page ul a {
    color: #4caf50;
    text-decoration: none;
    white-space: normal;
    -ms-word-break: break-all;
    word-break: break-all;
    /* Non standard for webkit */
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    transition: color .25s ease-in-out;
  }
  .phytoplankton-page p a:hover,
  .phytoplankton-page ol a:hover,
  .phytoplankton-page ul a:hover {
    color: #00796b;
    text-decoration: underline;
  }
  .phytoplankton-page p code,
  .phytoplankton-page ol code,
  .phytoplankton-page ul code {
    border-radius: 2px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    position: relative;
    z-index: 1;
    display: inline-block;
    vertical-align: baseline;
    zoom: 1;
    *display: inline;
    *vertical-align: auto;
    font-size: 14px;
    line-height: 17px;
    font-size: 0.875rem;
    line-height: 1.0625rem;
    margin-left: 2px;
    margin-left: 0.125rem;
    margin-right: 2px;
    margin-right: 0.125rem;
    padding-bottom: 2px;
    padding-bottom: 0.125rem;
    padding-left: 4px;
    padding-left: 0.25rem;
    padding-top: 2px;
    padding-top: 0.125rem;
    padding-right: 4px;
    padding-right: 0.25rem;
    white-space: normal;
    -ms-word-break: break-all;
    word-break: break-all;
    /* Non standard for webkit */
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
  .phytoplankton-page p ul,
  .phytoplankton-page ol ul,
  .phytoplankton-page ul ul {
    list-style-type: disc;
  }
  .phytoplankton-page pre {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    position: relative;
    z-index: 1;
    font-size: 14px;
    line-height: 16.8px;
    font-size: 0.875rem;
    line-height: 1.05rem;
    padding-top: 16px;
    padding-top: 1rem;
  }
  .phytoplankton-page pre:not([class*="language-"]) {
    padding: 16px;
    padding: 1rem;
  }
  .phytoplankton-page table {
    border-radius: 2px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    position: relative;
    z-index: 1;
  }

  .phytoplankton-page__item {
    background-color: #fff;
    padding: 24px 0px;
    padding: 1.5rem 0rem;
    position: relative;
  }
  .phytoplankton-page__item > h1 {
    margin-top: 0;
  }

  .code-lang {
    background-color: #272822;
    color: #f8f8f2;
    padding: 8px;
    padding: 0.5rem;
    text-transform: uppercase;
    text-shadow: none;
  }

  .code-render {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    position: relative;
    z-index: 1;
    border-radius: 2px 2px 0 0;
    margin-left: 1px;
    margin-left: 0.0625rem;
    margin-right: 1px;
    margin-right: 0.0625rem;
    padding: 75px 40px 40px 40px;
    padding: 4.6875rem 2.5rem 2.5rem 2.5rem;
    position: relative;
  }
  .code-render + pre {
    border-radius: 0 0 2px 2px;
    margin-top: 0;
  }
  .code-render:before {
    background-color: #272822;
    border-radius: 2px 0 0 0;
    color: #f8f8f2;
    content: "Example";
    left: 0;
    padding: 8px;
    padding: 0.5rem;
    position: absolute;
    text-transform: uppercase;
    top: 0;
  }

  .copy-to-clipboard {
    color: #f8f8f2;
    cursor: pointer;
    padding: 8px;
    padding: 0.5rem;
    position: absolute;
    right: 16px;
    right: 1rem;
    top: 0;
    z-index: 10;
  }
  .copy-to-clipboard + .copy-to-clipboard {
    display: none;
  }
  .copy-to-clipboard.is-active {
    display: block;
  }
  .copy-to-clipboard:hover .tooltip {
    opacity: 1;
  }
</style>
