# Figma MCP 集成指南

本指南介绍如何将 SaaS E-commerce Platform 的组件同步到 Figma 设计文件。

## 📋 目录

- [快速开始](#快速开始)
- [配置步骤](#配置步骤)
- [使用方法](#使用方法)
- [故障排除](#故障排除)
- [API 参考](#api-参考)

---

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 获取 Figma Personal Access Token

1. 登录 [Figma](https://www.figma.com)
2. 点击右上角头像 → **Settings**
3. 滚动到 **"Personal access tokens"** 部分
4. 点击 **"Create new token"**
5. 输入名称（如：`SaaS Platform Sync`）
6. 勾选权限：
   - ✅ `files:read` - 读取设计文件
   - ✅ `files:write` - 写入设计文件
   - ✅ `component_library:read` - 读取组件库
   - ✅ `component_library:write` - 写入组件库
7. 复制并保存令牌（**只显示一次**）

### 3. 配置项目

复制配置模板：

```bash
cp .figma-config.json.example .figma-config.json
```

编辑 `.figma-config.json`：

```json
{
  "accessToken": "YOUR_FIGMA_PERSONAL_ACCESS_TOKEN",
  "fileKey": "YOUR_FIGMA_FILE_KEY",
  "syncOptions": {
    "dryRun": true
  }
}
```

### 4. 运行同步

```bash
# 干运行（测试配置）
npm run figma:sync

# 实际同步
npm run figma:sync:live
```

---

## ⚙️ 配置步骤

### 配置文件详解

**`.figma-config.json`**

```json
{
  "accessToken": "YOUR_FIGMA_PERSONAL_ACCESS_TOKEN",
  "fileKey": "YOUR_FIGMA_FILE_KEY",
  "projectId": "YOUR_FIGMA_PROJECT_ID",
  "syncOptions": {
    "materialLibrary": true,
    "pageDecoration": true,
    "createComponents": true,
    "updateExisting": true,
    "dryRun": true
  },
  "componentMapping": {
    "MaterialLibrary": {
      "enabled": true,
      "frameName": "物料库组件",
      "columns": 5,
      "itemWidth": 300,
      "itemHeight": 220,
      "gap": 20
    },
    "PageDecoration": {
      "enabled": true,
      "frameName": "页面装饰组件",
      "itemWidth": 375,
      "itemHeight": 120,
      "gap": 16
    }
  }
}
```

### 配置项说明

| 字段 | 说明 | 必填 |
|------|------|------|
| `accessToken` | Figma Personal Access Token | ✅ |
| `fileKey` | Figma 文件 key（从 URL 获取） | ✅ |
| `projectId` | Figma 项目 ID | ❌ |
| `syncOptions.dryRun` | 干运行模式（生成代码但不执行） | ❌ 默认 true |
| `syncOptions.materialLibrary` | 同步物料库 | ❌ 默认 true |
| `syncOptions.pageDecoration` | 同步页面装饰 | ❌ 默认 true |
| `componentMapping.MaterialLibrary.columns` | 物料库列数 | ❌ 默认 5 |
| `componentMapping.MaterialLibrary.itemWidth` | 物料卡片宽度 | ❌ 默认 300 |
| `componentMapping.MaterialLibrary.itemHeight` | 物料卡片高度 | ❌ 默认 220 |
| `componentMapping.MaterialLibrary.gap` | 物料卡片间距 | ❌ 默认 20 |

### 如何获取 fileKey

1. 打开 Figma 设计文件
2. 查看 URL：`https://www.figma.com/file/FILE_KEY/...`
3. `FILE_KEY` 就是你要的值

示例：
```
URL: https://www.figma.com/file/abc123xyz789/My-Design
fileKey: abc123xyz789
```

---

## 📖 使用方法

### 方式一：使用 MCP Server（推荐用于 AI 辅助）

#### 配置 Cursor 编辑器

创建 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_API_KEY": "YOUR_FIGMA_PERSONAL_ACCESS_TOKEN"
      }
    }
  }
}
```

#### 使用示例

在 Cursor 中，你可以这样提问：

```
@figma 获取设计文件 abc123 的所有组件
@figma 查看组件库中的按钮样式
@figma 将设计文件中的颜色变量导出
```

### 方式二：使用同步脚本（推荐用于生产）

#### 同步物料库

```bash
# 仅同步物料库
npm run figma:sync
```

这会：
1. 读取 `src/mock/materialData.ts` 中的物料数据
2. 转换为 Figma 节点
3. 生成 Plugin 代码
4. 保存为 `figma-plugin-code.txt`

#### 在 Figma 中运行 Plugin

1. 打开 Figma
2. 菜单：**插件** → **开发** → **导入插件**
3. 打开 `figma-plugin-code.txt`
4. 复制全部代码
5. 粘贴到 Figma 插件编辑器
6. 点击 **运行**

### 方式三：创建独立 Figma Plugin

#### 创建 Plugin 项目

```bash
mkdir figma-plugin
cd figma-plugin
npm init -y
npm install -D @figma/plugin-typings
```

#### 创建 manifest.json

```json
{
  "name": "SaaS E-commerce Sync",
  "id": "your-plugin-id",
  "api": "1.0.0",
  "main": "code.js"
}
```

#### 构建 Plugin

```bash
npx figma plugin-build
```

---

## 🔧 故障排除

### 问题 1: 配置加载失败

**错误信息：**
```
配置文件不存在：xxx/.figma-config.json
```

**解决方案：**
```bash
cp .figma-config.json.example .figma-config.json
```

### 问题 2: Token 无效

**错误信息：**
```
Figma API Error (401): Invalid token
```

**解决方案：**
1. 检查 `.figma-config.json` 中的 `accessToken` 是否正确
2. 确保没有多余的空格或引号
3. 重新生成 Token

### 问题 3: 文件权限不足

**错误信息：**
```
Figma API Error (403): Forbidden
```

**解决方案：**
1. 确保 Token 有 `files:write` 权限
2. 确保你是 Figma 文件的编辑者或所有者

### 问题 4: 同步后找不到组件

**解决方案：**
1. 在 Figma 中查找名为 "物料库组件" 和 "页面装饰组件" 的 Frame
2. 检查是否在同一页面
3. 查看控制台输出的同步报告

---

## 📚 API 参考

### FigmaAPI 类

**位置：** `src/figma/api.ts`

#### 方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `getFile(fileKey)` | 获取文件信息 | fileKey: string | Promise\<FigmaFile\> |
| `getComponents(fileKey)` | 获取组件列表 | fileKey: string | Promise\<FigmaComponent[]\> |
| `getComponent(fileKey, componentKey)` | 获取组件详情 | fileKey, componentKey | Promise\<FigmaComponent\> |
| `getStyles(fileKey)` | 获取样式列表 | fileKey: string | Promise\<FigmaStyle[]\> |
| `getImage(fileKey, imageHash)` | 获取图像 URL | fileKey, imageHash | Promise\<string\> |
| `createComponent(fileKey, nodeKey)` | 创建组件 | fileKey, nodeKey | Promise\<any\> |
| `generatePluginCode(nodes)` | 生成 Plugin 代码 | nodes: FigmaNode[] | string |

### Transformers 函数

**位置：** `src/figma/transformers.ts`

#### 物料库转换

```typescript
// 单个物料转换
transformMaterialToNode(material, position, config): FigmaNode

// 批量转换
transformMaterialsToNodes(materials, config): FigmaNode[]
```

#### 页面装饰转换

```typescript
// 单个组件转换
transformPageComponentToNode(componentKey, position, config): FigmaNode | null

// 批量转换
transformPageComponentsToNodes(componentKeys, config): FigmaNode[]
```

#### 创建 Frame

```typescript
createFigmaFrame(name, width, height, position): FigmaNode
```

---

## 📁 文件结构

```
SaaS E-commerce Platform/
├── .cursor/
│   └── mcp.json                  # Cursor MCP 配置
├── .figma-config.json            # Figma 配置（需创建）
├── .figma-config.json.example    # 配置模板
├── src/
│   └── figma/
│       ├── api.ts                # Figma API 封装
│       ├── transformers.ts       # 数据转换器
│       ├── sync.ts               # 同步主入口
│       └── plugin-code.ts        # Figma Plugin 代码模板
├── figma-plugin-code.txt         # 生成的 Plugin 代码
├── figma-sync-report.md          # 同步报告
└── FIGMA_INTEGRATION_GUIDE.md    # 本文档
```

---

## 🎯 最佳实践

### 1. 使用干运行模式测试

首次使用时，保持 `dryRun: true`，确认配置正确后再执行实际同步。

### 2. 定期同步

建议每次更新物料库或页面组件后都执行同步：

```bash
npm run figma:sync
```

### 3. 版本控制

将 `.figma-config.json.example` 提交到 Git，但**不要**提交 `.figma-config.json`（包含敏感 Token）。

**.gitignore 配置：**
```gitignore
# Figma 配置
.figma-config.json
figma-plugin-code.txt
figma-sync-report.md
```

### 4. 组件命名规范

确保 React 组件和 Figma 组件使用一致的命名：

```typescript
// React 组件
const MaterialLibrary = () => {...}

// Figma Frame 名称
frame.name = '物料库组件'
```

---

## 🔗 相关资源

- [Figma REST API 文档](https://www.figma.com/developers/api)
- [Figma Plugin API 文档](https://www.figma.com/plugin-docs/)
- [Figma MCP Server](https://github.com/figma/mcp-server-guide)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

## 📞 支持

如有问题，请：

1. 查看本文档的 [故障排除](#故障排除) 部分
2. 检查同步报告 `figma-sync-report.md`
3. 联系项目维护者

---

*最后更新：2026-03-17*
