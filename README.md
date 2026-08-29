# GongPan Studio (G胖儿GongPan)

<div align="center">

**极简奢华 · 液态玻璃美学 · 聚合云端效率工具门户**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.2-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Motion](https://img.shields.io/badge/Motion-12.3-FF4154?logo=framer&logoColor=white)](https://motion.dev/)

[✨ 在线访问门户](https://gongpan.org) · [📦 核心产品矩阵](#-核心产品矩阵) · [🎨 设计与交互亮点](#-设计与交互亮点) · [🛠️ 本地运行与构建](#-本地运行与构建) · [💬 内测与交流渠道](#-内测与交流渠道)

</div>

---

## 🌟 项目简介

**GongPan Studio** 是由 **G胖儿GongPan** 倾力打造的高性能、响应式、多语言数字工具门户。项目深度融合了 **Apple 级液态玻璃美学（Liquid Glass UI）** 与前沿 Web 交互技术，汇集网盘资源聚合检索、外刊精读与本地离线 PDF 阅读器、AI 投资智能体、端到端加密即时通讯等一系列高效生产力工具。

---

## 📦 核心产品矩阵

### 1. 🔍 网盘影视资源搜 (PanSou)
- **定位**：全网云端资源一触即达（HOT TOOL）。
- **核心功能**：
  - **全生态多盘聚合**：深度检索夸克网盘、阿里云盘、百度网盘、迅雷云盘等主流平台公共共享资源。
  - **毫秒级极速响应**：优化的倒排索引与高并发请求通道，平均 0.08 秒呈现搜索结果。
  - **智能失效过滤**：内置实时链接健康探测，自动过滤失效死链，保障高存活率。
  - **纯净原画无广直链**：直达原网盘官方转存页面，享受 4K HDR 原画视听与无损资源。
- **访问入口**：`https://so.252035.xyz`（备用：`https://pansou.app/`, `http://gongcheng.yyboxdns.com:12309`）

---

### 2. 📖 外刊精读 (Reading Pro)
- **定位**：世界级顶尖期刊深度研读与沉浸式阅读器（PREMIUM）。
- **核心功能**：
  - **世界级旗舰期刊库**：收录《经济学人》(The Economist)、《纽约客》(The New Yorker)、《连线》(WIRED)、《自然》(Nature) 等顶级原版外刊。
  - **纯本地安全阅览**：基于 Canvas 优化内核与本地离线渲染，100% 本地加载，零隐私泄漏风险。
  - **专业双页与沉浸模式**：支持单/双页排版切换、矢量平滑缩放、液态玻璃夜间护眼模式及快速目录跳转。
  - **支持本地文件拖拽**：支持导入个人本地 PDF 进行即时高清精读。
- **访问入口**：内置路由 `/reading-pro`

---

### 3. 📈 AI 投资智能体 (AI Investment Agent)
- **定位**：AI 驱动的智能投资分析与财富决策助手（AI PRO）。
- **核心功能**：
  - **多维金融大脑**：实时消化全球财经快讯、企业财报与宏观政策，生成结构化投资研报。
  - **智能量化回测**：支持经典均线、动量、网格与多因子量化模型在历史长周期中快速验证。
  - **7×24 异动雷达**：全天候监测美股、A股、加密市场与大宗商品资金流向（Smart Money）。
  - **动态风控与头寸管理**：基于波动率动态建模计算最大回撤风险，提供科学止盈止损建议。
- **访问入口**：`https://cash.gongpan.org`

---

### 4. 💬 即时聊天软件 (GongPan Chat)
- **定位**：中国人自己的 Telegram，安全、快速、全平台的私密消息应用（BETA）。
- **核心功能**：
  - **端到端军事级加密**：基于成熟密码学协议，消息仅在终端本地加解密，服务器零知情存留。
  - **毫秒级高速传输**：精简网络通信协议，弱网环境下依然秒级触达。
  - **封闭内测与邀请机制**：当前处于测试阶段，仅受邀请用户可注册登录。
- **访问入口**：`http://gongcheng.yyboxdns.com:21312/`

---

## 🎨 设计与交互亮点

- **液态玻璃美学 (Liquid Glass UI)**：
  - 采用多层渐变磨砂毛玻璃效果（`backdrop-filter: blur`），配合顶部镜面高光反射线（Specular Reflection Rim）。
  - 硬件级抗锯齿圆角平滑裁剪，消除遮罩边缘与阴影失真。
  - 纯透光弹窗交互设计，背景不压暗，带来通透轻盈的视觉层次。
- **全球化 8 语系支持 (i18n)**：
  - 适配并原生支持 **中文（简体）、English、日本語、한국어、Español、Français、Deutsch、Ελληνικά**。
- **全场景深浅色自适应 (Dark / Light Mode)**：
  - 支持随系统偏好自动切换或用户手动锁定，主题切换平滑无闪烁。
- **流畅动效体验**：
  - 基于 `motion/react` 打造的 60fps 视差滚动、卡片浮动、拟态翻页与弹簧物理反馈。

---

## 🛠️ 本地运行与构建

### 环境要求
- **Node.js**: `v18.0.0` 或更高版本
- **包管理器**: `npm` / `pnpm` / `yarn`

### 1. 安装依赖
```bash
npm install
```

### 2. 本地开发调试
启动前后端集成开发服务器（默认端口 `3000`）：
```bash
npm run dev
```

### 3. 生产环境构建
```bash
npm run build
```

### 4. 运行生产服务
```bash
npm run start
```

---

## 📁 核心目录结构

```text
├── components/                 # UI 核心交互组件
│   ├── BetaApplyModal.tsx      # 内测申请专属液态玻璃弹窗
│   ├── Card.tsx                # Bento Grid 风格液态玻璃产品卡片
│   ├── Footer.tsx              # 底部版权与多语言入口
│   ├── Hero.tsx                # 首页视差 Hero 展区
│   ├── Home.tsx                # 首页聚合视图与 Bento 布局
│   ├── Navbar.tsx              # 顶部液态玻璃导航栏（多语言/搜索/主题切换）
│   ├── PdfViewer.tsx           # 本地离线 PDF 阅读器核心
│   ├── ProductShowcase.tsx     # 深度产品展示详情页
│   ├── ProductWorkstations.tsx # 4 大产品交互演练工作台
│   ├── ReadingPro.tsx          # 外刊精读完整工作空间
│   └── SupportModal.tsx        # 赞助与技术支持弹窗
├── src/
│   ├── data/
│   │   └── showcases.ts        # 全语言产品矩阵数据源与交互规格
│   └── types.ts                # 全局 TypeScript 类型接口
├── App.tsx                     # 根组件、全局路由与上下文
├── index.html                  # 页面 HTML 模板与元信息
├── index.css                   # Tailwind CSS v4 与液态玻璃特效样式
├── server.ts                   # Express + Vite 全栈集成服务器
└── package.json                # 项目依赖与运行脚本
```

---

## 💬 内测与交流渠道

如需申请 **GongPan Chat** 内测资格或获取更多工具动态，可通过以下官方渠道联系：

- 👥 **官方 QQ 交流群**：`991366619`（进群联系群主或管理员申请开通，备注「Chat 内测申请」）
- 📱 **微信官方公众号**：`G胖儿GongPan`（关注后发送消息或留言申请）
- 🌐 **门户官方网址**：[https://gongpan.org](https://gongpan.org)
- 💬 **Chat Web 客户端**：[前往 GongPan Chat Web 客户端](http://gongcheng.yyboxdns.com:21312/)

---

## 📄 版权许可

本项目由 **G胖儿GongPan** 开发维护，依据 MIT 协议开源。  
Copyright © 2024 - 2026 **G胖儿GongPan**. All rights reserved.
