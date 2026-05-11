import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Code2,
  ExternalLink,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Section } from "./Section";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USER || "skr-sumant";
const LEETCODE_USERNAME = import.meta.env.VITE_LEETCODE_USER || "skrsumant";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

const statCards = [
  {
  title: "LeetCode solved",
  icon: Sparkles,
  field: "leetcodeSolved",
  label: "Problems solved",
 extra: (
  <p>
    LeetCode handle:{" "}
    <a
      href={`https://leetcode.com/${LEETCODE_USERNAME}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-accent hover:text-primary font-share relative z-10 pointer-events-auto"
    >
      {LEETCODE_USERNAME}
      <ExternalLink size={14} />
    </a>
  </p>
),
},
  {
    title: "GitHub repos",
    icon: FaGithub,
    field: "repoCount",
    label: "Repositories",
  },
  {
    title: "LeetCode acceptance",
    icon: Activity,
    field: "leetcodeAcceptance",
    label: "Acceptance",
    suffix: "%",
  },

  {
    title: "GitHub active days",
    icon: Activity,
    field: "activeDays",
    label: "Days with contributions",
  },

  {
    title: "LeetCode rank",
    icon: Code2,
    field: "leetcodeRank",
    label: "Global rank",
  },
  {
    title: "GitHub contributions",
    icon: TrendingUp,
    field: "contributionCount",
    label: "Contributions",
  },

];

export function Stats() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    repoCount: 0,
    starCount: 0,
    contributionCount: 0,
    activeDays: 0,
    currentStreak: 0,
    leetcodeSolved: 0,
    leetcodeAcceptance: 0,
    leetcodeRank: "—",
    topRepos: [],
    repoUrl: `https://github.com/${GITHUB_USERNAME}`,
    leetcodeUrl: `https://leetcode.com/${LEETCODE_USERNAME}`,
  });

  const currentYearContributions = useMemo(() => {
    const total = stats.contributionCount;
    return typeof total === "number" ? total : 0;
  }, [stats.contributionCount]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        const githubHeaders = {
          "User-Agent": "Vite",
          ...(GITHUB_TOKEN ? { Authorization: GITHUB_TOKEN.startsWith('github_pat_') ? `Bearer ${GITHUB_TOKEN}` : `token ${GITHUB_TOKEN}` } : {}),
        };

        const [userRes, repoRes, contribRes, leetRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
            headers: githubHeaders,
          }),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
            signal: controller.signal,
            headers: githubHeaders,
          }),
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`, {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          }),
          fetch("/api/leetcode", {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query: `query leetUser($username: String!) { matchedUser(username: $username) { submitStats { acSubmissionNum { difficulty count submissions } } profile { ranking } } }`,
              variables: { username: LEETCODE_USERNAME },
            }),
          }),
        ]);

        if (!userRes.ok) {
          throw new Error(`GitHub user request failed (${userRes.status})`);
        }

        if (!repoRes.ok) {
          throw new Error(`GitHub repos request failed (${repoRes.status})`);
        }

        if (!contribRes.ok) {
          throw new Error(`GitHub contributions request failed (${contribRes.status})`);
        }

        if (!leetRes.ok) {
          throw new Error(`LeetCode request failed (${leetRes.status})`);
        }

        const [userData, repoData, contribData, leetData] = await Promise.all([
          userRes.json(),
          repoRes.json(),
          contribRes.json(),
          leetRes.json(),
        ]);

        const repoCount = userData.public_repos || 0;
        const starCount = Array.isArray(repoData)
          ? repoData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
          : 0;

        const topRepos = Array.isArray(repoData)
          ? repoData
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
            .slice(0, 3)
            .map((repo) => ({
              name: repo.name,
              stars: repo.stargazers_count || 0,
              url: repo.html_url,
              description: repo.description || "",
            }))
          : [];

        const contributionCount = typeof contribData === "object" && contribData?.total
          ? Object.values(contribData.total).reduce((sum, value) => sum + Number(value || 0), 0)
          : 0;

        const contributions = Array.isArray(contribData?.contributions)
          ? contribData.contributions
          : Array.isArray(contribData?.contributions?.nodes)
            ? contribData.contributions.nodes
            : [];

        const activeDays = contributions.filter((day) => day.count > 0).length;
        let currentStreak = 0;
        for (let i = contributions.length - 1; i >= 0; i -= 1) {
          if (contributions[i].count > 0) {
            currentStreak += 1;
          } else {
            break;
          }
        }

        const leetProfile = leetData?.data?.matchedUser;
        const leetAll = Array.isArray(leetProfile?.submitStats?.acSubmissionNum)
          ? leetProfile.submitStats.acSubmissionNum.find((item) => item.difficulty === "All")
          : null;
        const leetcodeSolved = leetAll?.count || 0;
        const leetcodeAcceptance = leetAll?.submissions
          ? Math.round((leetcodeSolved / leetAll.submissions) * 100)
          : 0;
        const leetcodeRank = leetProfile?.profile?.ranking || "—";

        setStats((prev) => ({
          ...prev,
          repoCount,
          starCount,
          contributionCount,
          activeDays,
          currentStreak,
          topRepos,
          leetcodeSolved,
          leetcodeAcceptance,
          leetcodeRank,
        }));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load stats.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadStats();
    return () => controller.abort();
  }, []);

  return (
    <Section id="stats" eyebrow="Realtime stats" title="GitHub & LeetCode activity">
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <div className={`grid gap-8 xl:grid-cols-[1.1fr_0.9fr] ${isLoading ? 'opacity-50' : ''}`}>
        <div className="grid gap-5 sm:grid-cols-2">
          {statCards.map((card) => {
            const Icon = card.icon;
            const value = stats[card.field];
            return (
              <div
                key={card.title}
                className="rounded-3xl bg-black/45 p-6 shadow-card backdrop-blur-4xl border border-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="mt-4 text-4xl font-bold tracking-tight text-foreground">
                      {isLoading ? "—" : `${value}${card.suffix || ""}`}
                    </p>
                  </div>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-primary shadow-sm">
                    <Icon size={24} />
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{card.label}</p>
                {card.extra && (<div className="mt-2 text-sm text-muted-foreground">{card.extra}
</div>
)}
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-black/45 p-6 shadow-card backdrop-blur-4xl border border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Live contribution</p>
                <h3 className="mt-4 text-3xl font-bold text-foreground">Daily GitHub flow</h3>
              </div>
              <FaGithub size={28} className="text-primary" />
            </div>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>
                Total contributions across visible GitHub history: <span className="font-semibold text-foreground">{isLoading ? "—" : currentYearContributions}</span>
              </p>
              <p>
                GitHub active days: <span className="font-semibold text-foreground">{isLoading ? "—" : stats.activeDays}</span>
              </p>
              <p>
                Current commit streak: <span className="font-semibold text-foreground">{isLoading ? "—" : stats.currentStreak} day{stats.currentStreak === 1 ? "" : "s"}</span>
              </p>
             
            </div>
          </div>

          <div className="rounded-3xl bg-black/45 p-6 shadow-card backdrop-blur-4xl border border-white/10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">GitHub top repos</p>
                <h3 className="mt-4 text-3xl font-bold text-foreground">Most popular repos</h3>
              </div>
              <a href={stats.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <FaGithub size={14} />

                <ExternalLink size={26} className="text-primary" />
              </a>
            </div>

            <div className="mt-6 space-y-4">
              {stats.topRepos.length > 0 ? (
                stats.topRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-accent/30"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-foreground">{repo.name}</p>
                      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        <Star size={14} /> {repo.stars}
                      </span>
                    </div>
                    {repo.description ? (
                      <p className="mt-2 text-sm text-muted-foreground">{repo.description}</p>
                    ) : null}
                  </a>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Loading repository summary…</p>
              )}
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 text-sm text-rose-200">
              Real-time stats could not load right now. Please refresh the page.
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
