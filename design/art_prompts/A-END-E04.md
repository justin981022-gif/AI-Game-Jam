# A-END-E04 — 集体离职·公司破产（含格鲁巴斯最后留言）

**类别**：结局 CG 静帧
**来源**：`design/narrative.md` v1.3 §结局表 E04 + 格鲁巴斯最后留言线 / `design/final-plan.md` 四结局收割点
**引用场景**：结局 E04（破产：员工集体离职 + 公司倒闭 + 格鲁巴斯小工牌作为告别道具）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1280×720（06c post-process 从 Gemini 1024×1024 裁切到 16:9） |
| 宽高比 | 16:9 |
| 背景要求 | 带场景背景（非透明）；雾紫晚霞基调，明度 60~70 |
| 切图方式 | 单张全屏 CG，直接铺底，不分层 |
| atoms 落位路径 | `atoms/assets/art/endings/A-END-E04.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：伤感但带苦涩温度、安静离职、夕阳余温、deadpan office-comedy 收束的温柔尾音
- 色盘偏重：辅 3 雾紫 `#7A6E8A`（窗外晚霞与办公室阴影主调）+ 主 2 陶土橘 `#C97B5C`（夕阳暖橙窗光）+ 辅 2 米白 `#E8E2D5`（离职信纸）+ 主 1 莫兰迪雾灰 `#B8B5A8`（空工位）+ 主 3 灰薄荷绿 `#8FA89B`（格鲁巴斯小工牌主体色）
- 特殊注意：
  - **空荡的 HR 办公室**：员工工位收拾干净（空桌面 + 推走的椅子 + 拔掉的台灯）
  - **前景中央桌上**放一张折叠的离职信（仅画纸张形状 + lorem 横线 + 印章圆点）+ 格鲁巴斯小工牌（**仅画工牌**：灰薄荷绿圆形头像剪影 + 黄铜金挂绳，**绝不出文字**）
  - **窗外夕阳暖橙**透进来作为唯一暖色光源，与雾紫室内形成温度反差
  - 不画任何角色（人物已离开）
  - 底部预留字幕条空间

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

cinematic 16:9 game ending CG illustration, centered storytelling composition, clean isolated illustration on a flat neutral background, ample empty space for UI overlay along the bottom subtitle band, an empty deserted HR office at sunset with no character figures present, the room is bathed in dusky-purple #7A6E8A indoor shadow tones with a single large back-window flooding warm terracotta-orange #C97B5C sunset light across the floor in soft hard-edged light blocks, three or four chibi-scale employee desks line the back wall completely tidied up: empty cleared desktops, swivel chairs pushed in or pulled aside at quiet angles, unplugged desk lamps tilted, a few empty cardboard moving boxes on the floor, on the foreground center desk sits a single folded cream-white #E8E2D5 resignation letter paper with three horizontal lorem placeholder bars and a small brick-red #A85C5C round wax-seal stamp dot (no readable text), beside the letter rests a tiny chibi employee ID badge representing Groobas the slime intern with a brass-gold #D4A574 lanyard cord and a circular dusty-mint-green #8FA89B slime-shape silhouette on the badge face (no readable name no readable text just a colored shape), the rest of the desk is empty save for a small wilting potted plant in the far corner, walls foggy-beige #B8B5A8 with rectangular lighter patches where framed posters used to hang, the overall mood is gently melancholic with a warm bittersweet undertone like a quiet farewell, soft even ambient lighting from the window combined with cool indoor shadow, signs and papers and badge and posters show only blank shapes or LOREM IPSUM placeholder bars, NO readable English or Chinese text anywhere, generous empty space along the bottom edge reserved for subtitle UI, palette dominated by foggy purple indoor and terracotta sunset window light
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, death imagery, dark horror style, photorealistic, real readable text, Asian fantasy parchment, Western fantasy ornaments, character figures present, employees still working at desks, HR director on screen, suicide imagery, hanging rope, funeral imagery, religious iconography, candles and incense, real handwritten Chinese characters on the resignation letter, real English handwritten letter, photographic sunset photo, dramatic god rays, lens flare, anime tear streams, slapstick exaggeration, dungeon stone walls, torches, fire
```

## 参考艺术家 / 作品（可选）

- BoJack Horseman 季终空房间夕阳镜头（雾紫 + 暖橙窗光的莫兰迪诀别感）
- 《Two Point Hospital》医院倒闭收尾插画（空座椅 + 纸箱）
- 《Reigns: Her Majesty》终局空王座卡牌（无人 + 留白）

## 切图与落位建议

- **切图方式详解**：06c post-process 从 Gemini 1024×1024 中央裁切 16:9 区域后下采样到 1280×720；前景中央离职信 + 工牌道具需完整保留作为情绪焦点
- **边距要求**：底部 80px 预留字幕条安全区；中央前景信件道具距下边缘 80~120px，避免被字幕条遮挡
- **资源导入建议**（Atoms）：
  - 命名：`A-END-E04.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：否

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：空 HR 办公室 + 离职信 + 格鲁巴斯小工牌（仅图形） + 窗外夕阳暖橙
- [ ] 未出现反向 prompt 禁忌：无任何角色、无血腥、无真实文字、无写实摄影、无戏剧化光线
- [ ] 尺寸落盘 1280×720（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/endings/A-END-E04.png` 保存
- [ ] 底部字幕条安全区留白充足
- [ ] 雾紫 + 陶土橘晚霞色调，伤感但带苦涩温度

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件:`atoms/assets/art/endings/A-END-E04__v1__flash.png`
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

### aiart-R1 @ 2026-05-27
- 模型：aiart 默认 artSpec
- 文件：atoms/assets/art/endings/A-END-E04.png
- 结论：🟡（Confidence：中）
- 评分：
  - 风格一致性：🟢 — 雾紫室内 + 陶土橘窗光对冲、米白离职信、灰薄荷点缀、扁平硬边光块（窗光投影地板），与 style_guide 莫兰迪扁平企业风一致
  - 主体正确：🟡 — 空 HR 办公室构图命中（多张工位收拾干净、推开椅子、纸箱、远角枯萎绿萝、窗外晚霞暖橙窗光），前景中央桌上离职信带砖红蜡印 + lorem 横线 ✓；但**格鲁巴斯小工牌（灰薄荷绿圆形剪影 + 黄铜金挂绳）作为情绪焦点之一在画面上不明显或缺失**——主体核心（空房+离职信+窗光）已成立，工牌为辅锚点，未达硬门槛失败
  - 构图尺寸：🟢 — 16:9，底部字幕安全区充足；中央前景信件清晰未被压线
  - 无禁忌元素：🟢 — 无角色、无血腥、无可读真实文字、无戏剧化光线/lens flare、无地下城石墙
  - 可用性：🟢 — 边缘清晰、色块整洁、无 artifacts；雾紫主调与暖橙窗光对比明确便于做最终结局画面
- 修正建议：
  > 辅锚点缺失：格鲁巴斯小工牌不够显眼。建议把特有描述段中"beside the letter rests a tiny chibi employee ID badge..."替换为：`directly next to the folded resignation letter rests a clearly visible chibi employee ID badge for Groobas the slime intern, the badge is rectangular cream-white #E8E2D5 with a thick charcoal #3D3A36 outline, on its face a circular dusty-mint-green #8FA89B slime-shape silhouette, attached at the top with a brass-gold #D4A574 lanyard cord curling onto the desk surface, this badge must be unmistakably visible at the center foreground as an emotional focal companion to the letter, no readable text on the badge`。当前缺陷不触及硬门槛，建议 🟡 入库由用户判断是否重出。
