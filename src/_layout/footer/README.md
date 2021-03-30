# footer组件

## 引入

1. 在`router.json`中的`layout`加入`footer`，举例：`"layout": ["header", "footer"]`。
2. 在页面html中需要引入header的地方引入`<%= LAYOUT.FOOTER['语言'] %>`，举例：`<%= LAYOUT.FOOTER['en'] %>`。
