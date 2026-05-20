# Atoms 工程根目录

地下城打工人（Dungeon HR）的程序工程，使用 **Atoms** 框架实现。

## 目录约定

```
atoms/
├── assets/
│   └── art/
│       ├── backgrounds/   # 场景背景
│       ├── characters/    # 主角立绘
│       ├── enemies/       # 勇者敌人
│       ├── ui/            # UI 框 / 图标
│       ├── fx/            # 特效
│       ├── props/         # 道具
│       ├── endings/       # 结局画面
│       └── emotes/        # 表情贴
└── ...（程序代码后续填充）
```

## 资产命名

`<asset_id>.png`，asset_id 由阶段六·B.1 资产清单定义（前缀 `A-BG / A-CHR / A-ENE / A-UI / A-FX / A-PROP / A-END / A-EMOTE`）。

## Placeholder 协议

美术未交付前，开发先用纯色 PNG 占位，按 asset_id 命名引用，等美术覆盖。
