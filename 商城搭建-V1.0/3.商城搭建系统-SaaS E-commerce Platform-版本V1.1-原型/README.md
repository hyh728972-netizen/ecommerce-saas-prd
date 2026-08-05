# SaaS 电商平台 - 项目运行指南

本项目是一个基于 React + TypeScript + Vite + Ant Design 的 SaaS 电商管理平台。

## 📋 目录

- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [开发命令](#开发命令)
- [构建命令](#构建命令)
- [部署命令](#部署命令)
- [常用辅助命令](#常用辅助命令)
- [故障排查](#故障排查)

---

## 🔧 环境要求

在开始之前，请确保您的系统满足以下要求：

- **Node.js**: v16.0.0 或更高版本（推荐 v18.x 或 v20.x）
- **npm**: v8.0.0 或更高版本
- **操作系统**: Windows 10/11、macOS 或 Linux

### 检查环境

```bash
# 检查 Node.js 版本
node -v

# 检查 npm 版本
npm -v
```

---

## 🚀 快速开始

### 1. 安装依赖

首次运行项目前，需要安装所有依赖：

```bash
npm install
```

**Windows PowerShell 用户注意**：如果遇到权限问题，请以管理员身份运行 PowerShell。

### 2. 启动开发服务器

```bash
npm run dev
```

启动成功后，您会看到类似以下输出：

```
  VITE v5.4.10  ready in 505 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

在浏览器中访问：http://localhost:5173/

---

## 💻 开发命令

### 启动开发服务器（热重载）

```bash
npm run dev
```

**说明**：
- 启动 Vite 开发服务器
- 支持热模块替换（HMR）
- 自动监听文件变化并刷新浏览器

### 指定端口启动

```bash
npm run dev -- --port 3000
```

### 允许外部访问

```bash
npm run dev -- --host
```

**说明**：允许局域网其他设备访问开发服务器

### 强制预处理器解析器

```bash
npm run dev -- --force
```

**说明**：强制 Vite 忽略缓存并重新解析依赖

---

## 🏗️ 构建命令

### 生产环境构建

```bash
npm run build
```

**说明**：
- 编译 TypeScript 代码
- 打包和优化所有资源
- 生成生产就绪的静态文件
- 输出目录：`dist/`

### 仅构建不打包

```bash
npx tsc -b
```

**说明**：仅编译 TypeScript，不进行 Vite 打包

### 预览生产构建

```bash
npm run preview
```

**说明**：在本地预览生产构建结果（默认端口 4173）

### 指定端口预览

```bash
npm run preview -- --port 8080
```

---

## 🚢 部署命令

### 构建并预览

```bash
npm run build
npm run preview
```

### 部署到生产环境

#### 方式 1：静态文件部署

```bash
# 1. 构建项目
npm run build

# 2. 将 dist 目录上传到您的 Web 服务器
# 例如：Nginx、Apache、IIS 等
```

#### 方式 2：部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel
```

#### 方式 3：部署到 Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

#### 方式 4：部署到 GitHub Pages

```bash
# 安装 gh-pages
npm install -D gh-pages

# 添加到 package.json scripts:
# "deploy": "gh-pages -d dist"

# 部署
npm run deploy
```

---

## 🛠️ 常用辅助命令

### 代码检查

```bash
# ESLint 代码检查
npm run lint
```

### 清理缓存

```bash
# 清理 node_modules
rmdir /s /q node_modules

# PowerShell
Remove-Item -Recurse -Force node_modules

# 清理 npm 缓存
npm cache clean --force

# 清理 Vite 缓存
rmdir /s /q node_modules\.vite

# PowerShell
Remove-Item -Recurse -Force node_modules\.vite
```

### 重新安装依赖

```bash
# Windows CMD
rmdir /s /q node_modules
del package-lock.json
npm install

# PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 更新依赖

```bash
# 更新所有依赖到最新版本
npm update

# 检查可更新的依赖
npm outdated

# 更新特定包
npm update antd
```

### 查看依赖信息

```bash
# 查看所有安装的依赖
npm list

# 查看依赖树
npm list --depth=0

# 查看特定包的详细信息
npm info antd
```

### 添加新依赖

```bash
# 添加生产依赖
npm install <package-name>

# 添加开发依赖
npm install -D <package-name>

# 示例
npm install axios
npm install -D @types/axios
```

### 移除依赖

```bash
# 移除包
npm uninstall <package-name>

# 示例
npm uninstall lodash
```

---

## 🔍 故障排查

### 常见问题 1：npm 未安装

**错误信息**：
```
npm : 无法将"npm"项识别为 cmdlet、函数、脚本文件或可运行程序的名称
```

**解决方案**：
1. 下载并安装 Node.js：https://nodejs.org/
2. 安装完成后重启终端
3. 验证安装：`node -v` 和 `npm -v`

### 常见问题 2：端口被占用

**错误信息**：
```
Port 5173 is in use
```

**解决方案**：
```bash
# 使用其他端口
npm run dev -- --port 3000

# 或者关闭占用端口的进程
# Windows: 查找并关闭 node.exe 进程
```

### 常见问题 3：依赖安装失败

**解决方案**：
```bash
# 1. 清理缓存
npm cache clean --force

# 2. 删除 node_modules 和 package-lock.json
rmdir /s /q node_modules
del package-lock.json

# 3. 重新安装
npm install

# 4. 如果仍然失败，尝试使用淘宝镜像
npm config set registry https://registry.npmmirror.com
npm install
```

### 常见问题 4：TypeScript 编译错误

**解决方案**：
```bash
# 检查 TypeScript 配置
npx tsc --noEmit

# 查看详细错误信息
npm run build -- --debug
```

### 常见问题 5：Less 编译错误

**解决方案**：
```bash
# 确保已安装 less
npm install -D less

# 检查 vite.config.ts 中的 Less 配置
# 确保 javascriptEnabled: true 已设置
```

---

## 📁 项目结构

```
SaaS E-commerce Platform/
├── node_modules/          # 依赖包
├── public/                # 静态资源
├── src/                   # 源代码
│   ├── components/        # 公共组件
│   ├── pages/             # 页面组件
│   ├── types/             # TypeScript 类型定义
│   ├── mock/              # Mock 数据
│   ├── App.tsx            # 应用入口
│   ├── main.tsx           # React 入口
│   └── index.less         # 全局样式
├── dist/                  # 构建输出目录
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目文档
```

---

## 🎯 开发建议

### 推荐的开发流程

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **开发过程中**
   - 文件修改后自动热重载
   - 遇到错误时查看终端输出
   - 使用浏览器开发者工具调试

3. **提交代码前**
   ```bash
   npm run lint
   npm run build
   ```

4. **定期清理缓存**
   ```bash
   # 每月清理一次
   npm cache clean --force
   ```

### 性能优化建议

- 使用 `npm ci` 替代 `npm install` 进行 CI/CD 构建
- 定期运行 `npm outdated` 更新依赖
- 生产构建使用 `npm run build` 进行优化

---

## 📝 其他实用命令

### 查看 npm 配置

```bash
# 查看所有配置
npm config list

# 查看当前镜像源
npm config get registry
```

### 切换 npm 镜像源

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 使用官方镜像
npm config set registry https://registry.npmjs.org
```

### 全局安装包

```bash
# 全局安装 Vite
npm install -g vite

# 全局安装 TypeScript
npm install -g typescript

# 全局安装 ESLint
npm install -g eslint
```

### 检查项目健康状态

```bash
# 检查依赖是否有安全漏洞
npm audit

# 自动修复安全问题
npm audit fix

# 查看依赖包大小
npm ls --depth=0 --long
```

---

## 📞 需要帮助？

如果您遇到其他问题，可以：

1. 查看 [Vite 官方文档](https://vitejs.dev/)
2. 查看 [React 官方文档](https://react.dev/)
3. 查看 [Ant Design 文档](https://ant.design/)
4. 检查项目的 GitHub Issues

---

**最后更新时间**: 2024-01-XX
**项目版本**: 0.0.0
