import Link from "next/link";

type VoteTopic = {
  id: string;
  date: string;
  user: string;
  project: string;
  content: string;
  link: string;
  good: number;
  shit: number;
};

const topics: VoteTopic[] = [
  {
    id: "top",
    date: "2025.11.29",
    user: "@KM53894",
    project: "tenprotocol",
    content:
      "Ethereum의 L2 전략은 정말 잘못되었는가?",
    link:
      "https://x.com/KM53894/status/1982430171912364478?s=20",
    good: 68,
    shit: 32,
  },
  {
    id: "1",
    date: "2025.11.27",
    user: "@KM53894",
    project: "brevis_zk",
    content:
      "gBrevis with Toyota",
    link:
      "https://x.com/KM53894/status/1973217254771925333?s=20",
    good: 1,
    shit: 99,
  },
  {
    id: "2",
    date: "2025.11.23",
    user: "@austinjmo22",
    project: "spaace",
    content:
      "오늘 Spaace의 Vision & Mission 문서를 읽어보면서 이 프로젝트가 추구하는 방향을 간단하게 정리해봤습니다.",
    link:
      "https://x.com/austinjmo22/status/1992487851066548374?s=20",
    good: 75,
    shit: 25,
  },
  {
    id: "3",
    date: "2025.11.27",
    user: "@MoneyMonkeycC8journal",
    project: "liquidtrading, Lighter_xyz, HyperliquidX, OstiumLabs, Bantr_fun",
    content:
      "킁킁 킁킁 이게 @liquidtrading 의 향기?",
    link:
      "https://x.com/MoneyMonkeycC8/status/1993890661276520888?s=20",
    good: 24,
    shit: 76,
  },
  {
    id: "4",
    date: "2025.11.24",
    user: "@Ho53903Ho",
    project: "brevis_zk, cysic_xyz",
    content:
      "왜 ZK dApp은 @brevis_zk와 @cysic_xyz이 필요할까?",
    link:
      "https://x.com/Ho53903Ho/status/1992445502474912152?s=20",
    good: 56,
    shit: 44,
  },
];

const pieBackground = (good: number) =>
  `conic-gradient(#7c3aed 0deg ${((good / 100) * 360).toFixed(2)}deg, #f97316 ${(
    (good / 100) *
    360
  ).toFixed(2)}deg 360deg)`;

const TopicCard = ({ topic }: { topic: VoteTopic }) => (
  <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
    <div className="flex items-center justify-between text-sm text-white/70">
      <span>{topic.date}</span>
      <span>{topic.user}</span>
    </div>
    <Link href={topic.link} target="_blank">
      <p className="mt-4 text-md text-white/90 cursor-pointer hover:text-purple-300 transition-colors duration-200">
        {topic.content}
      </p>
    </Link>
    <p className="mt-2 text-white/80">{topic.project}</p>
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <div
        className="h-24 w-24 rounded-full border border-white/10"
        style={{ background: pieBackground(topic.good) }}
        aria-label={`good ${topic.good}%, shit ${topic.shit}%`}
      />
      <div className="flex flex-1 flex-col gap-2 text-sm text-white/80">
        <div className="flex items-center justify-between">
          <span className="font-medium text-violet-200">Good</span>
          <span>{topic.good}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${topic.good}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-orange-200">Shit</span>
          <span>{topic.shit}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-orange-400"
            style={{ width: `${topic.shit}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400">
          Good
        </button>
        <button className="rounded-full bg-orange-500/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400">
          Shit
        </button>
      </div>
    </div>
  </article>
);

export default function VotePage() {
  const [featured, ...rest] = topics;

  return (
    <div className="min-h-screen bg-[#09090f] px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-wide text-white/60">
            Good vs Shit Posting
          </p>
          <h1 className="text-4xl font-extrabold">Shit post or Creative Post?</h1>
          <p className="text-white/70">
            X에 올라온 화제의 포스트가 찬양받을만한 Good Posting인지, 아니면
            거짓으로 가득한 Shit Posting인지 직접 읽고 투표해보세요
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-violet-500/10 p-8 shadow-lg shadow-violet-500/10">
          <p className="text-sm uppercase tracking-wide text-white/60">
            오늘의 메인 재판
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            {featured.project}
          </h2>
          <p className="mt-1 text-sm text-white/60">{featured.user} · {featured.date}</p>
          <Link href={featured.link} target="_blank">
            <p className="mt-4 text-lg text-white/90 cursor-pointer hover:text-orange-300 transition-colors duration-200">
              {featured.content}
            </p>
          </Link>
          <div className="mt-6 grid gap-6 md:grid-cols-[auto,1fr,auto]">
            <div
              className="mx-auto h-40 w-40 rounded-full border border-white/10"
              style={{ background: pieBackground(featured.good) }}
              aria-label={`good ${featured.good}%, shit ${featured.shit}%`}
            />
            <div className="flex justify-center gap-20">
              <div>
                <p className="text-sm text-white/60">Good</p>
                <p className="text-3xl font-bold text-violet-200">
                  {featured.good}%
                </p>
              </div>
              <span>vs</span>
              <div>
                <p className="text-sm text-white/60">Shit</p>
                <p className="text-3xl font-bold text-orange-200">
                  {featured.shit}%
                </p>
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <button className="w-full rounded-full bg-violet-500 px-6 py-3 text-lg font-semibold transition hover:bg-violet-400">
                Good
              </button>
              <button className="w-full rounded-full bg-orange-500/80 px-6 py-3 text-lg font-semibold transition hover:bg-orange-400">
                Shit
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">대기 중인 재판</h3>
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/40">
              새 투표 제안하기
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}