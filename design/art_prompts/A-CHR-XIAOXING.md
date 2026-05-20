# A-CHR-XIAOXING — 宵星·骷髅法师

**类别**：角色立绘
**来源**：`design/narrative.md` v1.3 §角色表 #4（宵星·骷髅法师，远程输出岗，中段招募；隐藏词条「省钱攒学费」）
**引用场景**：中段招募流程 / L04 谈薪 /「我只需要做到够用就行，不需要最优秀。」

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-XIAOXING.png` |
| pivot 位置 | Bottom Center（袍角下摆中点，便于战斗界面与对话槽位对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：节俭省钱的理性气场、学生书生感、低调克制、与世无争的"够用就行"
- 色盘偏重：辅 3 雾紫 `#7A6E8A`（法师袍主色，narrative 角色配色）+ 辅 1 描边深炭 `#3D3A36`（统一描边）+ 辅 2 米白 `#E8E2D5`（骨色与衬衣领） + 辅 4 黄铜金 `#D4A574`（工牌挂绳极少点缀） + 主 1 莫兰迪雾灰米 `#B8B5A8`（纯灰底）
- 特殊注意：
  - 强调**学生书生感**而非邪术师 —— 朴素**带补丁/破洞的简陋法师袍**（narrative：宽大法师袍，省钱攒学费），袍口磨损但干净整洁
  - **领带松开半结**（narrative 关键词），表明刚下班/还在赶简历的疲惫感
  - **书本塞在挎包里**（narrative 关键词），半本笔记本/账本从布质斜挎包里露出来
  - 神态**理性克制**：眼眶（空洞眼窝里的小光点）平静温和，不耍狠不张扬，气质像在图书馆复习的研究生
  - 是友善骷髅法师，**绝非邪术师**：禁腐肉、禁血污、禁绿色亡灵火焰、禁暗黑邪能氛围

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of Xiaoxing the Skeleton Mage, a chibi 2.5-head proportion friendly skeleton character standing facing forward in a calm reserved studious pose, clean cream-white #E8E2D5 simplified cartoon skull head with two oversized round soft glowing dot-eyes that look gentle and rational rather than menacing, wearing a plain oversized dusty-purple #7A6E8A mage robe that is visibly thrifty and well-worn with a couple of small patched holes near the hem and frayed sleeves but still tidy and clean, a half-loosened solid-color office necktie hanging around the bony neck above the robe collar like a tired post-graduate student after work, a simple cloth shoulder satchel slung across the body with a half-tucked notebook and a folded study booklet visibly poking out of the bag flap, a brass-gold #D4A574 lanyard with a tiny employee ID badge as a small accent on the chest, hands politely folded in front holding a humble wooden staff that looks more like a study pointer than a battle weapon, posture slightly slouched in a frugal unassuming way, expression composed and quietly economical conveying the bookworm vibe of someone saving every coin for tuition, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the robe hem, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, decaying flesh, rotting meat on bones, blood stains on robe, evil necromancer cliche, sinister glowing green ghost flames, dark fel sorcery aura, summoned skulls floating around, soul tendrils, hooded grim reaper figure, scythe, dark horror style, menacing red eyes, jagged dripping fangs, cracked broken skull with chunks missing, edgy goth purple neon, oversaturated dark magic effects, evil villain crouching pose, raised casting hands with explosion, multiple skeleton minions in scene, undead horde behind, second figure, intimidating death lord vibe
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》Q 版员工"非人骨架穿西装"的反差喜剧造型
- 《Reigns: Her Majesty》纯灰底单卡角色构图
- BoJack Horseman 中莫兰迪雾紫袍/外套的低饱和扁平塑造

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024（保持主体居中、袍角下摆与画面下边缘 ≥ 60px 距离）；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px、下方至少 60px、左右各至少 100px 透明安全区（袍宽较占横向空间，建议构图收紧）
- **资源导入建议**（Atoms）：
  - 命名：`A-CHR-XIAOXING.png`（与目录约定一致）
  - pivot / anchor：Bottom Center（袍角下摆中点）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 `A-CHR-HR` / `A-CHR-GROOBAS` 共打 `characters_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：朴素破洞雾紫袍 + 松开领带 + 书本挎包 + 学生书生气
- [ ] 未出现反向 prompt 禁忌：无腐肉血污、无亡灵绿火、无邪术师反派造型
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/characters/A-CHR-XIAOXING.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 characters_atlas
- [ ] 在中段招募 / L04 谈薪 实际显示正常：节俭学生气场可被玩家直观感知，与"省钱攒学费"隐藏词条暗合

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/characters/A-CHR-XIAOXING__v1__flash.png`
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
