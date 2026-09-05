#!/usr/bin/env node
// Generates placeholder narration audio for every TwoStageClose slide using
// Open JTalk, a free offline Japanese TTS engine (robotic, but works with no
// API key). Requires it to be installed on the system:
//   apt-get install open-jtalk open-jtalk-mecab-naist-jdic hts-voice-nitech-jp-atr503-m001
//
// The text below matches each slide's narration in src/Script/data.ts, with
// alphabetic abbreviations spelled out phonetically ("CO" -> "シーオー")
// since Open JTalk cannot read Latin letters. If data.ts narration changes,
// update the matching entry here too.
//
// Usage: node scripts/generate-openjtalk-audio.mjs
// Then:  npm run sync-audio

import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const audioDir = path.join(projectRoot, "public", "audio");

const OPEN_JTALK_DIC = "/var/lib/mecab/dic/open-jtalk/naist-jdic";
const OPEN_JTALK_VOICE =
  "/usr/share/hts-voice/nitech-jp-atr503-m001/nitech_jp_atr503_m001.htsvoice";
const FFMPEG =
  "/home/user/-w/node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg";

// slide id -> reading text (narration from data.ts, CO spelled out)
const READINGS = {
  title:
    "トスアップ案件における、2段階クローズの有効性検証。今回は、成約率だけでなく、シーオー率・純成約率まで見て検証するための社内共有内容をご紹介します。",
  conclusion:
    "結論から言うと、トスアップ案件は、原則として2段階クローズを試験運用する価値が高いと考えています。今回の成功事例では、1回目の面談で信頼形成と必要性の整理を行い、面談の間にご本人が独学の難しさを実感したうえで、2回目に研修を解決策として提示できました。この順番が、納得度の高い成約と、契約後の撤回、いわゆるシーオーの抑制につながった可能性が高いです。ただし、現時点では成約事例が1件のみ。まだ証明された段階ではなく、有望な仮説として、これから検証していきます。",
  background:
    "背景にあるのは、これまでの観測です。アポ獲得からクロージングまで一人で一気通貫して担当した成約は、ほぼシーオーがありませんでした。一方、他の担当からトスアップされた案件では、過去にシーオーが3件発生しています。そして今回、クロージングを2回に分けて成約した案件では、現時点でシーオーが出ていません。ここから、『トスアップ案件では信頼の引き継ぎと意思決定の時間が不足しやすく、2段階の方が契約後の納得感を維持しやすいのでは』という仮説が生まれました。",
  "why-co":
    "では、なぜトスアップ案件はシーオーが起きやすいのでしょうか。大きく4つの理由が考えられます。まず、信頼を作った人と契約を担当する人が別人であること。次に、1回の面談に説明から契約までを詰め込みすぎること。そして、必要性が営業側の言葉のままで、お客様自身の言葉になりきっていないこと。最後に、費用や家族への相談といった懸念が、面談中ではなく終わった後に出てくることです。",
  "success-factors":
    "今回の成約にはいくつかの共通点がありました。1回目では商品を売らず、ヒアリングと教育に徹したこと。目的を収入額の先、たとえば将来の働き方まで深掘りしたこと。課題をご本人の言葉で認識してもらったこと。そして面談の間に実際に行動してもらい、独学の限界をご自身で体感してもらったこと。価格を提示する前に、内容への納得と、期間の希望を先に確認したこと。これらが積み重なって、押し付けではなく、本人が選んだという納得感につながりました。",
  flow: "これを型にしたものが、2段階クローズの標準フローです。1回目は信頼形成と課題認識、業界教育が中心で、価格提示や契約は急ぎません。面談の間は、お客様ご自身に実際に行動してもらう期間です。2回目で、行動した内容へのフィードバックを行い、そのうえで解決策として研修を提示、意思決定していただきます。契約後も、クーリングオフや支払い方法を丁寧に説明し、納得を確認する時間を設けます。",
  checklist:
    "すべての案件を2回に分けるわけではありません。目的や課題がまだ曖昧だったり、費用や家族への不安が見える場合は、原則2回に分けます。一方、ご本人がすでに目標や課題を明確に言語化できている場合は、1回完結も検討します。",
  kpi: "検証では、シーオー率と純成約率を中心に、着座率や成約までの日数なども合わせて記録します。まずは10件を目安に途中集計し、可能であれば20件以上まで継続する予定です。",
  summary:
    "今回の勝因は、単に2回会ったことではありません。1回目で売らずに信頼と必要性を作り、面談の間に本人が行動し、2回目で本人の実体験に合う解決策として提示したこと。この設計そのものが重要です。トスアップ案件は、この2段階クローズを標準候補として試験運用し、成約率だけでなくシーオー後に残る純成約率で評価していきます。",
  closing:
    "以上、トスアップ案件における2段階クローズの有効性検証でした。",
};

if (!existsSync(OPEN_JTALK_VOICE)) {
  console.error(
    "Open JTalk voice not found. Install with:\n" +
      "  apt-get install open-jtalk open-jtalk-mecab-naist-jdic hts-voice-nitech-jp-atr503-m001",
  );
  process.exit(1);
}

const scratch = mkdtempSync(path.join(tmpdir(), "openjtalk-"));

for (const [id, text] of Object.entries(READINGS)) {
  const txtPath = path.join(scratch, `${id}.txt`);
  const wavPath = path.join(scratch, `${id}.wav`);
  const mp3Path = path.join(audioDir, `${id}.mp3`);

  writeFileSync(txtPath, text);
  execFileSync("open_jtalk", [
    "-x",
    OPEN_JTALK_DIC,
    "-m",
    OPEN_JTALK_VOICE,
    "-r",
    "1.0",
    "-ow",
    wavPath,
    txtPath,
  ]);
  execFileSync(FFMPEG, ["-i", wavPath, "-q:a", "4", mp3Path, "-y"], {
    stdio: "ignore",
  });
  console.log(`✓ ${id} -> public/audio/${id}.mp3`);
}

console.log("\nDone. Now run: npm run sync-audio");
