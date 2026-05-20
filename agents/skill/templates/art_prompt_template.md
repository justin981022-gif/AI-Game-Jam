# {{Asset ID}} — {{资产中文名}}

**类别**：场景背景 / 角色立绘 / UI 图标 / 敌人 / 特效 / 道具
**来源**：（策划文档中的哪一节）
**引用场景**：（关卡 ID 或 UI 页面）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1024×1024（或 1920×1080 等） |
| 宽高比 | 1:1 / 16:9 / 9:16 |
| 背景要求 | 透明 PNG / 纯色 / 带背景 |
| 切图方式 | 单张 / 九宫格 / 逐帧序列 / atlas 拼接 |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-HERO.png` |
| pivot 位置 | Center / Bottom / Custom(x, y) |

## 风格锚点（继承自 art_style_guide）

- 情绪词：
- 色盘偏重：
- 特殊注意：

## 正向 Prompt（可直接拷贝到 Gemini）

```
<在此拼接：art_style_guide 的正向前缀 + 本资产的特有描述>

Example:
soft watercolor style, muted palette, warm morning light, painterly brush strokes,
2D side-scrolling game art, hand-drawn feel, inspired by Studio Ghibli and Gris,

<具体到本资产：full body portrait of a young cat-girl hero in a red cape,
holding a glowing pocket watch, standing in a meadow, facing forward, neutral pose,
centered composition, transparent background, 1024x1024>
```

## 反向 Prompt / 禁忌

```
<在此拼接：art_style_guide 的反向前缀 + 本资产特有禁忌>

Example:
photorealistic, 3D render, text, watermark, low quality, blurry,
anatomically incorrect, extra limbs, neon colors,

<具体到本资产：adult face, dark tone, weapons, gore>
```

## 参考艺术家 / 作品（可选）

> 用来进一步约束 Gemini 出图方向。

- 作品/艺术家 1：
- 作品/艺术家 2：

## 切图与落位建议

- **切图方式详解**：
  > 示例："九宫格按 128/256/128 横向切分"、"逐帧 4 帧切为水平 sprite sheet 间距 10px"、"单张直接用"
- **边距要求**：（上下左右各预留多少像素透明边）
- **资源导入建议**（Atoms）：
  - 命名：与目录约定一致（asset_id 大写连字符）
  - pivot / anchor：Center / Bottom / Custom(x, y)
  - 像素游戏类资产：标记 Point 采样
  - atlas 打包：是否需要

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt 描述
- [ ] 未出现反向 prompt 禁忌
- [ ] 尺寸与元数据一致
- [ ] 已按 atoms 落位路径保存
- [ ] 资源导入设置已调整
- [ ] 在场景/UI 中实际显示正常（pivot 正确、颜色对得上色盘）

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/<category>/<asset_id>__v1__flash.png`
- 结论：🟢 / 🟡 / 🔴
- Confidence：高 / 中 / 低（仅 🔴 必填）
- 评分：
  - 风格一致性：🟢/🟡/🔴
  - 主体正确：🟢/🟡/🔴
  - 构图尺寸：🟢/🟡/🔴
  - 无禁忌元素：🟢/🟡/🔴
  - 可用性：🟢/🟡/🔴
- 修正建议（🔴/🟡 时必填，仅可改特有描述段）：
  > ...

### Flash#2 @ <时间戳>
- ...（若 Flash#1 触发重试则追加；Flash#2 的修正段 **替换** Flash#1 的，不累加）

### Pro#1 @ <时间戳>
- ...（Pro 轮审核降级为 3 维度：主体正确 / 无禁忌 / 可用性）
