# A-UI-TOAST — 教学引导气泡（吐司）

**类别**：UI 框（9-slice）
**来源**：`design/art_asset_list.md` v1.1 §5.4 UI 框（新增）+ `design/narrative.md` v1.3 T02 / T03 / T04 教学浮层触发点
**引用场景**：游戏初期教学引导浮层（招募教学 / 战斗教学 / 突发事件教学），由代码切换文案文字

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 600×160（06c post-process 自 Gemini 1024×1024 中央裁 15:4 后下采样 + color-to-alpha） |
| 宽高比 | 15:4 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（吐司本体周围留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 32/536/32，纵向 32/96/32（四角圆角 16px 保护） |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-TOAST.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan 内部 IM 弹窗、像 HR 系统右下角弹的"温馨提示"、克制温吞
- 色盘偏重：辅 2 米白 `#E8E2D5`（气泡主体）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）+ 辅 1 描边深炭灰 `#3D3A36`（粗描边）+ 辅 4 黄铜金 `#D4A574`（左侧 icon 槽位边框点缀） + 辅 3 雾紫 `#7A6E8A`（左侧 icon 内填充提示色，避免与主 CTA 陶土橘冲突）
- 特殊注意：
  - **横向扁平气泡**，左侧 128×128 区为 icon 槽位（仅出空圆角方块 + 极小恶魔角剪影占位，不画真实 icon 图形）
  - 右侧 ≥440px 为正文区，留 2 行 LOREM IPSUM 占位横线
  - **顶端无尖角箭头**（与传统聊天气泡区分，此版本为通用 toast，箭头由代码可选叠加）
  - **9-slice 友好**：左侧 icon 槽位限制在 32px 安全区，中央正文区可横向拉伸至更宽（用于长教学文本）
  - 公文体质感：米白底 + 雾灰描边 + 黄铜金细线，不要羊皮卷 / 卡通对话框毛笔字效

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate tooltip toast bubble aesthetic, centered composition, 9-slice border layout, an empty horizontally elongated rounded-rectangle tutorial tooltip frame in 15:4 ratio occupying about 80 percent of the canvas centered, NO characters anywhere, NO chibi monsters, NO figures of any kind around or inside the bubble, ABSOLUTELY no mascots flanking the toast, ONLY the empty toast frame itself, warm cream #E8E2D5 paper-like fill across the entire bubble body, surrounded by a uniform 5px charcoal #3D3A36 hand-drawn outline with gently rounded 16px corners, NO speech-bubble tail or pointer arrow on any edge, the left side of the bubble contains a small square icon slot of about 128 by 128 outlined with brass-gold #D4A574 hairline, the icon slot interior is dusty muted muted #7A6E8A foggy purple flat fill with a tiny low-key matte black devil-horn silhouette placeholder centered inside, the right side of the bubble is a flat empty text area showing two LOREM IPSUM placeholder horizontal bars implying body text, all internal divisions are drawn as faint hairline charcoal rules at low opacity, decorative corner ornaments kept minimal within a 32px corner safe zone, no real text anywhere, only LOREM IPSUM placeholder bars to imply text fields, the area outside the toast frame is pure flat foggy-beige #B8B5A8 grey negative space with absolutely nothing in it, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan corporate tooltip mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, real readable letters, full sentences, calligraphy, scrolls, wax seals, leather book texture, ribbon banners, gemstones, glowing magical borders, ornate baroque corners, gilded filigree, holographic effects, chibi monsters surrounding toast, characters around UI, mascots flanking, manga speech bubble tail, comic book pointer arrow, large cartoon exclamation mark, "TIPS" wordmark, large CTA button on toast
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》右下角内部 IM 教学提示弹窗
- 现代企业 SaaS 后台 onboarding 引导气泡（克制扁平）
- macOS 通知中心扁平 toast（无渐变 + 无光效）

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 32/536/32，纵向 32/96/32；四角圆角受 32px 安全区保护；中央正文区可横向拉伸
- **边距要求**：上下左右各预留 32px 安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-TOAST.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 `ui_atlas`）
  - Sprite Mode：Sliced 9-slice，Border L=32 R=32 T=32 B=32

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：15:4 横向气泡 + 左 icon 槽 + 右正文留白 + 公文体扁平
- [ ] 未出现反向 prompt 禁忌：无真实文字、无聊天气泡尖角箭头、无角色、无戏剧光效
- [ ] 尺寸落盘 600×160（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-TOAST.png` 保存
- [ ] 9-slice 切片设定正确，横向拉伸时 icon 槽位与圆角不变形

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-TOAST__v1__flash.png`
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
