# MyWebsiteDemo 项目图表

本文档整合了 MyWebsiteDemo 项目的各种结构图和流程图，帮助开发者快速理解项目架构和工作流程。

## 目录

1. [项目结构](#项目结构)
2. [项目目录图](#项目目录图)
3. [应用流程图](#应用流程图)
4. [状态管理流程图](#状态管理流程图)

## 项目结构

详细的项目结构和说明请查看 [project-structure.md](./project-structure.md) 文件。

## 项目目录图

下面是项目的目录结构可视化图表：

![项目目录图](./project-diagram.md)

## 应用流程图

下面是应用的主要流程和组件交互图：

![应用流程图](./application-flow.md)

## 状态管理流程图

下面是状态管理的工作流程图：

![状态管理流程图](./state-management-flow.md)

## 核心技术栈

- **前端框架**: React 
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **路由**: React Router
- **SVG 处理**: vite-plugin-svgr

## 主要功能模块

1. **用户认证系统**
   - 登录/注销功能
   - 权限控制
   - 状态持久化

2. **主题管理**
   - 亮色/暗色/系统主题
   - 主题切换
   - 设置持久化

3. **路由系统**
   - 嵌套路由
   - 共享布局
   - 页面组件

4. **UI组件库**
   - 导航栏
   - 页脚
   - 认证表单
   - 图标系统

## 开发指南

要查看这些图表，请使用支持 Mermaid 语法的 Markdown 查看器，如 VS Code 配合 Markdown Preview Enhanced 插件，或者在 GitHub 上查看这些文件。