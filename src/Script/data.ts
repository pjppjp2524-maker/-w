export type BaseSlide = {
  id: string;
  seconds: number;
  heading: string;
  narration: string;
};

export type TitleSlideData = BaseSlide & {
  kind: "title";
  subheading: string;
};

export type BulletsSlideData = BaseSlide & {
  kind: "bullets";
  bullets: string[];
};

export type ComparisonSlideData = BaseSlide & {
  kind: "comparison";
  routes: {
    label: string;
    desc: string;
    result: string;
    tone: "good" | "bad";
  }[];
};

export type ReasonsSlideData = BaseSlide & {
  kind: "reasons";
  reasons: string[];
};

export type GroupsSlideData = BaseSlide & {
  kind: "groups";
  groups: { title: string; items: string[] }[];
};

export type FlowSlideData = BaseSlide & {
  kind: "flow";
  steps: { title: string; items: string[] }[];
};

export type ChecklistSlideData = BaseSlide & {
  kind: "checklist";
  columns: { title: string; tone: "yes" | "no"; items: string[] }[];
};

export type KpiSlideData = BaseSlide & {
  kind: "kpi";
  primary: string[];
  secondary: string[];
  note: string;
};

export type SummarySlideData = BaseSlide & {
  kind: "summary";
  quote: string;
};

export type ClosingSlideData = BaseSlide & {
  kind: "closing";
  line: string;
};

export type Slide =
  | TitleSlideData
  | BulletsSlideData
  | ComparisonSlideData
  | ReasonsSlideData
  | GroupsSlideData
  | FlowSlideData
  | ChecklistSlideData
  | KpiSlideData
  | SummarySlideData
  | ClosingSlideData;

export const slides: Slide[] = [
  {
    id: "title",
    kind: "title",
    seconds: 15,
    heading: "トスアップ案件における\n2段階クローズの有効性検証",
    subheading: "成約率・CO率・純成約率で見る社内共有",
    narration:
      "トスアップ案件における、2段階クローズの有効性検証。今回は、成約率だけでなく、CO率・純成約率まで見て検証するための社内共有内容をご紹介します。",
  },
  {
    id: "conclusion",
    kind: "bullets",
    seconds: 30,
    heading: "結論",
    bullets: [
      "トスアップ案件は2段階クローズを試験運用する価値が高い",
      "1回目で信頼形成、2回目で解決策提示という順番がCO抑制につながった可能性",
      "ただし成約事例はまだ1件。仮説段階として検証する",
    ],
    narration:
      "結論から言うと、トスアップ案件は、原則として2段階クローズを試験運用する価値が高いと考えています。今回の成功事例では、1回目の面談で信頼形成と必要性の整理を行い、面談の間にご本人が独学の難しさを実感したうえで、2回目に研修を解決策として提示できました。この順番が、納得度の高い成約と、契約後の撤回、いわゆるCOの抑制につながった可能性が高いです。ただし、現時点では成約事例が1件のみ。まだ証明された段階ではなく、有望な仮説として、これから検証していきます。",
  },
  {
    id: "background",
    kind: "comparison",
    seconds: 30,
    heading: "背景と現時点の観測",
    routes: [
      {
        label: "一気通貫",
        desc: "アポ獲得〜クロージングまで一人で担当",
        result: "ほぼCOなし",
        tone: "good",
      },
      {
        label: "他担当トスアップ",
        desc: "他の担当からトスアップされた案件",
        result: "過去にCOが3件",
        tone: "bad",
      },
      {
        label: "今回の2段階クローズ",
        desc: "クロージングを2回に分けて実施",
        result: "現時点でCOなし",
        tone: "good",
      },
    ],
    narration:
      "背景にあるのは、これまでの観測です。アポ獲得からクロージングまで一人で一気通貫して担当した成約は、ほぼCOがありませんでした。一方、他の担当からトスアップされた案件では、過去にCOが3件発生しています。そして今回、クロージングを2回に分けて成約した案件では、現時点でCOが出ていません。ここから、『トスアップ案件では信頼の引き継ぎと意思決定の時間が不足しやすく、2段階の方が契約後の納得感を維持しやすいのでは』という仮説が生まれました。",
  },
  {
    id: "why-co",
    kind: "reasons",
    seconds: 40,
    heading: "なぜトスアップ案件でCOが起きやすいのか",
    reasons: [
      "信頼関係が分断される",
      "1回の面談に役割が集中しすぎる",
      "必要性が顧客自身の言葉になっていない",
      "潜在的な懸念が面談後に表面化する",
    ],
    narration:
      "では、なぜトスアップ案件はCOが起きやすいのでしょうか。大きく4つの理由が考えられます。まず、信頼を作った人と契約を担当する人が別人であること。次に、1回の面談に説明から契約までを詰め込みすぎること。そして、必要性が営業側の言葉のままで、お客様自身の言葉になりきっていないこと。最後に、費用や家族への相談といった懸念が、面談中ではなく終わった後に出てくることです。",
  },
  {
    id: "success-factors",
    kind: "groups",
    seconds: 40,
    heading: "今回の成功要因",
    groups: [
      {
        title: "信頼づくり",
        items: [
          "1回目では商品を売らず、ヒアリングに徹した",
          "ヒアリングだけでなく教育も行った",
          "目的を収入額の先(将来の働き方)まで深掘りした",
        ],
      },
      {
        title: "課題の自分ごと化",
        items: [
          "課題をご本人の言葉で認識してもらった",
          "面談の間に実際に行動してもらった",
          "独学の限界をご自身で体感してもらった",
        ],
      },
      {
        title: "意思決定の順番",
        items: [
          "価格提示は後回しにした",
          "内容への納得を先に確認した",
          "期間の希望を先に確認した",
        ],
      },
    ],
    narration:
      "今回の成約にはいくつかの共通点がありました。1回目では商品を売らず、ヒアリングと教育に徹したこと。目的を収入額の先、たとえば将来の働き方まで深掘りしたこと。課題をご本人の言葉で認識してもらったこと。そして面談の間に実際に行動してもらい、独学の限界をご自身で体感してもらったこと。価格を提示する前に、内容への納得と、期間の希望を先に確認したこと。これらが積み重なって、押し付けではなく、本人が選んだという納得感につながりました。",
  },
  {
    id: "flow",
    kind: "flow",
    seconds: 40,
    heading: "2段階クローズの標準フロー",
    steps: [
      {
        title: "1回目",
        items: ["信頼形成・課題認識", "業界教育", "価格提示はしない"],
      },
      {
        title: "面談間",
        items: ["本人が実際に行動する期間"],
      },
      {
        title: "2回目",
        items: ["行動へのFB", "解決策提示", "意思決定"],
      },
      {
        title: "成約後",
        items: ["納得確認", "COを防ぐための説明"],
      },
    ],
    narration:
      "これを型にしたものが、2段階クローズの標準フローです。1回目は信頼形成と課題認識、業界教育が中心で、価格提示や契約は急ぎません。面談の間は、お客様ご自身に実際に行動してもらう期間です。2回目で、行動した内容へのフィードバックを行い、そのうえで解決策として研修を提示、意思決定していただきます。契約後も、クーリングオフや支払い方法を丁寧に説明し、納得を確認する時間を設けます。",
  },
  {
    id: "checklist",
    kind: "checklist",
    seconds: 20,
    heading: "2回に分けるべき案件の見分け方",
    columns: [
      {
        title: "原則2回に分ける",
        tone: "no",
        items: [
          "アポインターとクローザーが別人",
          "高額プラン・分割検討",
          "目的が曖昧",
          "不安が見える",
        ],
      },
      {
        title: "1回完結も検討できる",
        tone: "yes",
        items: [
          "目標や課題がすでに明確",
          "オープンマインド",
          "自己投資に積極的",
        ],
      },
    ],
    narration:
      "すべての案件を2回に分けるわけではありません。目的や課題がまだ曖昧だったり、費用や家族への不安が見える場合は、原則2回に分けます。一方、ご本人がすでに目標や課題を明確に言語化できている場合は、1回完結も検討します。",
  },
  {
    id: "kpi",
    kind: "kpi",
    seconds: 15,
    heading: "検証で追うKPIと方法",
    primary: ["CO率", "純成約率"],
    secondary: ["着座率", "成約までの日数", "CO理由"],
    note: "まず10件、可能なら20件以上まで集計",
    narration:
      "検証では、CO率と純成約率を中心に、着座率や成約までの日数なども合わせて記録します。まずは10件を目安に途中集計し、可能であれば20件以上まで継続する予定です。",
  },
  {
    id: "summary",
    kind: "summary",
    seconds: 20,
    heading: "まとめ・今後の方針",
    quote:
      "再現すべきは“2回会うこと”自体ではなく、\n本人が課題と購入理由を“発見”し、納得して契約する設計",
    narration:
      "今回の勝因は、単に2回会ったことではありません。1回目で売らずに信頼と必要性を作り、面談の間に本人が行動し、2回目で本人の実体験に合う解決策として提示したこと。この設計そのものが重要です。トスアップ案件は、この2段階クローズを標準候補として試験運用し、成約率だけでなくCO後に残る純成約率で評価していきます。",
  },
  {
    id: "closing",
    kind: "closing",
    seconds: 10,
    heading: "ご清聴ありがとうございました",
    line: "トスアップ案件における2段階クローズの有効性検証",
    narration:
      "以上、トスアップ案件における2段階クローズの有効性検証でした。",
  },
];
