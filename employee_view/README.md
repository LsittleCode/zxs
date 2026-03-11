# OpenClaw Vue UI（中文增强版）

## 架构策略（先策略，后开发）
1. **分层对接**：`api` 层只负责 OpenClaw HTTP；`stores` 层负责业务状态；`components/views` 负责展示。
2. **实时优先**：默认通过 `VITE_OPENCLAW_WS_URL` 建立 WebSocket；未配置时自动回退演示流。
3. **中文无侵入**：接口字段保持英文，UI 文案统一中文。
4. **可替换动画引擎**：当前用 CSS 像素风龙虾（环境受限无法安装 Pixi.js），后续可平滑替换。

## 目录
- `src/api/openclaw.ts`：OpenClaw 接口封装
- `src/stores/openclaw.ts`：Pinia 状态管理（系统状态/会话/工作流）
- `src/utils/openclawSocket.ts`：实时通道封装（WebSocket + fallback）
- `src/components/layout`：布局
- `src/components/workflow`：工作流面板与进度图
- `src/components/lobster`：像素龙虾助手
- `src/views/OpenClawDashboard.vue`：主页面

## 环境变量
- `VITE_OPENCLAW_BASE_URL`：API 地址（默认 `http://localhost:8000/api`）
- `VITE_OPENCLAW_WS_URL`：实时 WebSocket 地址（可选）

## 启动
```bash
npm run dev
```
