## 简介

fox-css-loader会根据当前项目环境做viewport自动适配兼容

## 用法

### 安装

```bash
npm install @fox/fox-css-loader --registry http://npm.devops.erp.ocj.com.cn/
```

### fox脚手架创建的模版配置

找到vue.config.js文件，然后添加以下代码。

#### vue.config.js

```js
//-----添加移动端viewport适配start----
        ["scss","css","sass"].forEach((r)=>{
            config.module.rule(r).oneOf('vue').use("fpx-loader").before("postcss-loader").loader(require.resolve("@fox/fox-css-loader"));
            config.module.rule(r).oneOf('normal').use("fpx-loader").before("postcss-loader").loader(require.resolve("@fox/fox-css-loader"));
        })
        config.plugin("fpx-plugin").use(require("@fox/fox-css-loader").FoxCssPlugin, [{}]);
        //-----添加移动端viewport适配end----
```



### 普通项目webpack配置

#### 引入loader

```js
{
  loader: '@fox/fox-css-loader',
  options: {
    rootValue: {
      fpx: 750, //设置设计稿基准(默认iphone6@2x-750px)
    },
    platform: 'web',
    unitPrecision: 5,
  }
}
```

#### 引入plugin

```js
{
  plugins: [
    new (require('@fox/fox-css-loader').FoxCssPlugin)()
  ]
}
```

### 使用

#### xxx.css

```css
{
	.container {
		width: 100fpx //“100”代表设计稿上标注的尺寸，“fpx”为fox中的单位。
    height: 100fpx  
	}	
}
```



## 成为开发者

如有任何问题请与东方购物前端团队联系，获取相应的开发权限。

东方购物前端团队欢迎👏👏👏您的加入😊！！