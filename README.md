# 电影App

这是一个使用React Native开发的电影应用，提供电影列表浏览、搜索和详情查看功能。

## 功能特点

- 🎬 电影列表展示，包含电影标题、海报、发布日期
- 🔍 电影搜索功能
- 📋 电影详情页面，展示完整信息
- 🎨 优雅的UI设计和流畅的用户体验
- ⚠️ 完善的错误处理机制
- 🌐 使用The Movie Database (TMDb) API获取数据

## 技术栈

- **框架**: React Native 0.82.1
- **语言**: TypeScript
- **状态管理**: Redux Toolkit
- **导航**: React Navigation 6.x
- **网络请求**: Axios
- **UI组件**: React Native内置组件

## 安装与运行

### 1. 环境要求

- Node.js >= 20
- npm 或 yarn
- React Native CLI
- Xcode (iOS开发)
- Android Studio (Android开发)

### 2. 安装依赖

```bash
# 安装依赖
npm install

# iOS特有依赖
cd ios && pod install && cd ..
```

### 3. 配置API密钥

1. 在 [The Movie Database](https://www.themoviedb.org/) 注册账号并获取API密钥
2. 打开 `src/services/config.ts` 文件，将 `YOUR_TMDB_API_KEY` 替换为您的实际API密钥

```typescript
export const API_CONFIG = {
  API_KEY: '您的API密钥', // 替换为实际的API密钥
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
};
```

### 4. 运行项目

```bash
# iOS
npm run ios

# Android
npm run android

# 启动开发服务器
npm start
```

## 项目结构

```
src/
├── components/     # 可复用组件
├── navigation/     # 导航配置
├── redux/          # Redux状态管理
│   ├── slices/     # Redux切片
│   ├── store.ts    # Redux store配置
│   └── hooks.ts    # 自定义Redux hooks
├── screens/        # 页面组件
│   ├── MovieListScreen.tsx     # 电影列表页
│   └── MovieDetailScreen.tsx   # 电影详情页
└── services/       # 服务层
    └── config.ts   # API配置
```

## 主要功能说明

### 电影列表页面
- 进入页面自动加载热门电影列表
- 支持下拉刷新（待实现）
- 提供搜索框，可根据电影标题进行搜索
- 电影列表项支持点击进入详情页面

### 电影详情页面
- 展示电影海报、标题、发布日期、评分
- 显示电影完整简介
- 支持返回上一页

### 错误处理
- 网络请求失败时显示友好的错误提示
- 加载状态显示加载动画
- 空数据状态显示提示信息

## 性能优化

- 使用React.memo避免不必要的重渲染
- 图片使用CDN加载优化
- 合理的组件拆分和代码组织

## 测试

```bash
# 运行测试
npm test
```

## 注意事项

- 请确保在实际使用前配置有效的TMDb API密钥
- API调用有频率限制，请合理使用
- 在生产环境中，建议使用环境变量来管理API密钥等敏感信息

## License

MIT
