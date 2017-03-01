# AppServerHTML

![license](https://img.shields.io/badge/license-MIT-blue.svg)

## 简介
基于dva+antd的`App`在线下载、安装前端。可在线下载安装包, 或者`iPhone`在线安装ipa。

	没学过做前端, 做得很粗糙, 大家将就用着吧😅

**首页**
![pic](img/home.png)

**上传App**
![pic](img/upload.png)

**App详情页**
![pic](img/app_detail.png)

**App编辑页**
![pic](img/app_edit.png)

## 功能
- [x] 选择、拖拽上传安装包
- [x] 下载安装包
- [x] `iPhone`在线安装ipa
- [x] 短链接生成二维码
- [x] 编辑App信息
- [x] 管理App

更多...

## 使用
### 环境
- node.js
- macOS(其它平台尚未测试)

### 浏览器
- google chrome(其它浏览器尚未测试)

### 打包
1. `git clone https://github.com/skytoup/AppServerHTML`
2. `cd AppServerHTML`
3. `npm install`
4. `npm run build`
5. 复制dist文件夹里面的文件到[AppServer](https://github.com/skytoup/AppServer)的html目录下

### 服务器
请参考👉, 传送门: [AppServer](https://github.com/skytoup/AppServer)

## 使用的开源项目
- [dva](https://github.com/dvajs/dva): 🌱 React and redux based, lightweight and elm-style framework. (Inspired by elm and choo)
- [antd](https://github.com/ant-design/ant-design): 🐜 A UI Design Language
- [qrcode.react](https://github.com/zpao/qrcode.react): A <QRCode/> component for use with React. http://zpao.github.io/qrcode.react/
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard): Copy-to-clipboard React component

# 相关文章
- [一个实现App在线下载、安装的工具​](http://skytoup.wicp.net/2017/03/01/%E4%B8%80%E4%B8%AA%E5%AE%9E%E7%8E%B0App%E5%9C%A8%E7%BA%BF%E4%B8%8B%E8%BD%BD%E3%80%81%E5%AE%89%E8%A3%85%E7%9A%84%E5%B7%A5%E5%85%B7/)

# 联系方式
- QQ：875766917，请备注
- Mail：875766917@qq.com