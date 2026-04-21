# 美术风格规范 — {{项目名称}}

**日期**：
**负责人**：美术风格规范师（AI subagent）
**上游依赖**：`design/concept.md`（尤其是"核心情绪词"）

---

## 风格一句话

> 用一句话描述整体美术风格，要具体到可以立刻想象画面。
> 示例："低饱和水彩 + 硬边高光的 2D 侧视平台游戏，晨光色调"

## 风格参考锚点

> 引用 2~4 个有名的游戏/动画/画家作为参考。这些锚点会作为 Gemini 提示词的"参考艺术家"字段来源。

| 参考源 | 借鉴维度 |
|-------|---------|
| 游戏 A |  |
| 电影/动画 B |  |
| 画家 C（如 Ghibli / Moebius / Gris 美术） |  |

## 主色盘

> 3 个主色 + HEX + 情绪注解。所有关卡背景、UI 主色、角色主体应从此派生。

| 色号 | HEX | 情绪注解 | 使用场景 |
|------|-----|---------|---------|
| 主 1 | #  |  |  |
| 主 2 | #  |  |  |
| 主 3 | #  |  |  |

## 辅色盘

| 色号 | HEX | 用途 |
|------|-----|------|
| 辅 1 | #  |  |
| 辅 2 | #  |  |
| 辅 3 | #  |  |
| 辅 4（可选） | #  |  |
| 辅 5（可选） | #  |  |

## 视觉档位

| 维度 | 档位 | 描述 |
|------|------|------|
| 饱和度 | 低 / 中 / 高 |  |
| 对比度 | 柔和 / 中等 / 强烈 |  |
| 明度基调 | 偏暗 / 中灰 / 明亮 |  |
| 线条 | 无线 / 细描边 / 粗描边 |  |
| 质感 | 扁平 / 手绘笔触 / 像素 / 3D 渲染风 |  |

## 构图语言

- **镜头距离**：远景 / 中景 / 近景 / 特写偏好
- **视角**：2D 侧视 / 2D 俯视 / 2.5D / 斜视角 / 第一人称
- **比例**：写实 / Q 版（头身比）/ 抽象
- **留白习惯**：紧凑 / 中等 / 大量留白

## 光照语言

- **主光源类型**：自然光（白天/黄昏/夜晚）/ 人造光（霓虹/烛光/灯笼）/ 魔法光
- **阴影处理**：硬阴影 / 柔阴影 / 无阴影
- **氛围词**：朦胧 / 清透 / 戏剧化 / 静谧

## 禁忌元素

> 明确不要出现的视觉元素。Jam 中这一项用来避免 Gemini 跑偏。

- 不要：
- 不要：
- 不要：

## Gemini 提示词前缀（可复用片段）

> 所有资产提示词的共用前缀，保证风格一致性。分为**正向**和**反向**两段英文。

### 正向 prompt 前缀

```
<在此填写统一的英文正向提示词，比如：
soft watercolor style, muted palette, warm morning light, painterly brush strokes,
2D side-scrolling game art, hand-drawn feel, consistent line weight,
inspired by Studio Ghibli and Gris, subtle cel shading>
```

### 反向 prompt 前缀

```
<在此填写统一的英文反向提示词，比如：
photorealistic, 3D render, text, watermark, low quality, blurry,
anatomically incorrect, extra limbs, cluttered background,
neon colors, oversaturated, modern technology>
```

## 与下游阶段的交接约定

- **给 6·B 资产提示词工程师**：每个资产的 prompt 必须以上方"正向 prompt 前缀"开头，再接资产特有描述；反向 prompt 同理
- **给 Unity 开发**：主辅色盘的 HEX 应配置到全局 ColorPalette ScriptableObject，避免 UI/场景各画各的
- **给 Playtest**：Playtest 报告中的"美术观感"一节以本文档为对照基准
