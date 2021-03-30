# header组件

## 引入

1. 在`router.json`中的`layout`加入`header`，举例：`"layout": ["header", "footer"]`。
2. 在页面html中需要引入header的地方引入`<%= LAYOUT.HEADER['语言'] %>`，举例：`<%= LAYOUT.HEADER['en'] %>`。

## 全局事件

### headerGetUser

在header尝试获取当前登录用户时，若获取成功，会触发此事件：

```js
// 随便在什么时候订阅此事件
document.addEventListener('headerGetUser', (e) => {
  console.log(e.detail);
}, false);
```
