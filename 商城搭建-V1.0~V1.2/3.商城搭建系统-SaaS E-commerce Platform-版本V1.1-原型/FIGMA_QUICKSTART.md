# Figma 集成 - 快速开始

## 3 分钟快速配置

### 步骤 1: 获取 Figma Token

1. 访问 [Figma](https://www.figma.com) 并登录
2. 点击右上角头像 → **Settings**
3. 滚动到 **"Personal access tokens"**
4. 点击 **"Create new token"**
5. 输入名称，勾选所有权限
6. **复制令牌**（只显示一次）

### 步骤 2: 运行配置脚本

```bash
npm run figma:setup
```

按提示输入：
- Figma Personal Access Token
- Figma 文件 Key（从 URL 获取）

### 步骤 3: 测试同步

```bash
npm run figma:sync
```

这会生成：
- `figma-plugin-code.txt` - Figma Plugin 代码
- `figma-sync-report.md` - 同步报告

### 步骤 4: 在 Figma 中运行

1. 打开 Figma
2. **插件** → **开发** → **导入插件**
3. 打开 `figma-plugin-code.txt`
4. 复制全部代码并粘贴
5. 点击 **运行**

✅ 完成！物料库和页面装饰组件已同步到 Figma。

---

## 命令速查

```bash
# 快速配置
npm run figma:setup

# 干运行（测试）
npm run figma:sync

# 实际同步
npm run figma:sync:live

# 安装依赖（首次使用）
npm install
```

---

## 配置 Cursor MCP（可选）

如果使用 Cursor 编辑器，可以配置 MCP 实现 AI 辅助：

1. 运行 `npm run figma:setup` 时选择配置 Cursor
2. 重启 Cursor
3. 在对话中使用 `@figma` 命令

示例：
```
@figma 获取设计文件的所有组件
@figma 查看按钮样式
```

---

## 文件说明

| 文件 | 说明 |
|------|------|
| `.figma-config.json` | Figma 配置（需手动创建） |
| `.figma-config.json.example` | 配置模板 |
| `.cursor/mcp.json` | Cursor MCP 配置 |
| `src/figma/api.ts` | Figma API 封装 |
| `src/figma/transformers.ts` | 数据转换器 |
| `src/figma/sync.ts` | 同步主程序 |
| `src/figma/plugin-code.ts` | Plugin 代码模板 |
| `figma-plugin-code.txt` | 生成的 Plugin 代码 |
| `figma-sync-report.md` | 同步报告 |
| `FIGMA_INTEGRATION_GUIDE.md` | 完整集成指南 |

---

## 常见问题

**Q: 找不到配置文件？**
```bash
cp .figma-config.json.example .figma-config.json
```

**Q: Token 无效？**
- 检查是否复制完整
- 确保没有多余空格
- 重新生成 Token

**Q: 同步后找不到组件？**
- 在 Figma 中查找 "物料库组件" 和 "页面装饰组件" Frame
- 查看 `figma-sync-report.md` 了解详情

**Q: 如何更新配置？**
- 直接编辑 `.figma-config.json`
- 重新运行 `npm run figma:sync`

---

## 下一步

- 📖 阅读完整文档：[FIGMA_INTEGRATION_GUIDE.md](FIGMA_INTEGRATION_GUIDE.md)
- 🔗 Figma API 文档：https://www.figma.com/developers/api
- 🛠️ Plugin 开发指南：https://www.figma.com/plugin-docs/

---

*需要帮助？查看 [FIGMA_INTEGRATION_GUIDE.md](FIGMA_INTEGRATION_GUIDE.md) 的故障排除部分*
