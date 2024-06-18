# 为什么需要 SSR

- 首屏等待在客户端渲染的模式下，所有的数据请求和 DOM 渲染都在浏览器端完成，所以第一次访问页面时，可能会出现白屏，而服务端渲染会在服务端进行数据请求和 DOM 渲染，浏览器收到的完整内容，可以渲染页面
- SEO SPA 对搜素引擎不够友好

# SSR + SPA 同构

- 第一次访问页面是 SSR，后面的访问是 SPA，而且支持 SEO
- 客户端和服务器端同构可以实现（尽可能复用代码）
- 工作流程
  - 服务端运行 React 代码渲染出 HTML 字符串
  - 服务端把渲染出的 HTML 页面发送给了浏览器
  - 浏览器接收到 HTML 会渲染到页面上
  - 浏览器发现页面引用的 client.js 文件会去下载
  - 浏览器下载得到的 client.js 文件并在浏览器端执行
  - 浏览器中的代码接管了页面的所有内容，后面和客户端渲染是一样的

# 客户端路由

- 客户端请求服务器
- 服务器返回 HTML 给浏览器，浏览器渲染显示页面
- 浏览器发现需要外链 JS 资源，加载 JS 资源
- 加载好的 JS 资源在浏览器端执行
- JS 中的 React 代码开始实现路由功能
- 路由代码首先获取地址栏中的地址，然后根据不同的地址根据路由配置渲染对应内容
