#!/usr/bin/env node
/**
 * notify_feishu.js — 向飞书群发送互动卡片
 * 用法: node agents/skill/notify_feishu.js <payload.json>
 *
 * payload.json 字段：
 *   stage        string   阶段名，如"主策划确认"
 *   project      string   项目名
 *   pitch        string   一句话 Pitch（可选）
 *   loop_summary string   核心 Loop 描述（可选）
 *   decisions    Array    需团队决策的问题列表（可选）
 *     .question  string   问题描述
 *     .options   string[] 选项列表（可选）
 *     .current   string   当前建议（可选）
 *   notes        string   底部备注（可选）
 */

const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '../../.workflow/feishu_config.json');

function loadWebhookUrl() {
  if (process.env.FEISHU_WEBHOOK_URL) return process.env.FEISHU_WEBHOOK_URL;
  if (fs.existsSync(CONFIG_FILE)) {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    if (cfg.webhook_url) return cfg.webhook_url;
  }
  throw new Error('找不到 Webhook URL：请设置 FEISHU_WEBHOOK_URL 或在 .workflow/feishu_config.json 中配置');
}

function buildCard(p) {
  const els = [];

  // 基本信息
  els.push({
    tag: 'div',
    text: { tag: 'lark_md', content: `**项目**：${p.project}\n**阶段**：${p.stage} — 等待三人确认` }
  });

  // Pitch
  if (p.pitch) {
    els.push({ tag: 'hr' });
    els.push({
      tag: 'div',
      text: { tag: 'lark_md', content: `**📌 一句话 Pitch**\n${p.pitch}` }
    });
  }

  // Loop
  if (p.loop_summary) {
    els.push({
      tag: 'div',
      text: { tag: 'lark_md', content: `**🔄 核心 Loop**\n${p.loop_summary}` }
    });
  }

  // Decisions
  if (p.decisions && p.decisions.length > 0) {
    els.push({ tag: 'hr' });
    els.push({
      tag: 'div',
      text: { tag: 'lark_md', content: '**🗳️ 需要三人共同确认的决策**' }
    });
    p.decisions.forEach((d, i) => {
      let content = `**${i + 1}. ${d.question}**`;
      if (d.options && d.options.length > 0)
        content += '\n' + d.options.map(o => `　• ${o}`).join('\n');
      if (d.current)
        content += `\n　*当前建议：${d.current}*`;
      els.push({ tag: 'div', text: { tag: 'lark_md', content } });
    });
  }

  // Footer
  els.push({ tag: 'hr' });
  els.push({
    tag: 'note',
    elements: [{
      tag: 'plain_text',
      content: p.notes || '请在群内讨论后，由任意一人将最终决策告知 AI 继续流程。'
    }]
  });

  return {
    header: {
      title: { tag: 'plain_text', content: `🎮 ${p.stage} · ${p.project}` },
      template: 'blue'
    },
    elements: els
  };
}

async function main() {
  const payloadPath = process.argv[2];
  if (!payloadPath) {
    console.error('用法: node notify_feishu.js <payload.json>');
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(path.resolve(payloadPath), 'utf8'));
  const card = buildCard(payload);
  const url = loadWebhookUrl();

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg_type: 'interactive', card })
  });

  const result = await resp.json();
  if (result.code !== 0) {
    console.error('飞书 API 错误:', JSON.stringify(result));
    process.exit(1);
  }
  console.log('✅ 飞书通知已发送');
}

main().catch(e => { console.error(e.message); process.exit(1); });
