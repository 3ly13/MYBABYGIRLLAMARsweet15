import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
}

interface Balloon {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  message: string;
  popped: boolean;
  popX: number;
  popY: number;
}

interface PopMessage {
  id: number;
  x: number;
  y: number;
  message: string;
}

const BALLOON_MESSAGES = [
  "ya ottaty el gamela",
  "my sweetheart",
  "ro7 ALBY",
  "Noor 3eyewny",
  "habibty el te3ma",
  "3asaleya",
  "battoty",
  "habibit alby",
  "my beautiful queen",
  "my angel",
  "my queen",
  "my everything",
  "I love you",
  "ba3shek",
  "bamot feky",
  "I adore you",
];

const BALLOON_COLORS = [
  "#D4AF37",
  "#FFCB45",
  "#C68958",
  "#5A1F35",
  "#c0394e",
  "#e8698a",
  "#b5293e",
  "#D4AF37",
];

// ─── Data ────────────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    icon: "✨",
    date: "The Beginning",
    title: "A Random Snapchat Add",
    body: "I saw your profile picture and added you without any idea who you would become to me. Then you added me back — because you liked my baby picture. That tiny, random moment became the beginning of everything.",
  },
  {
    icon: "💬",
    date: "Getting to Know You",
    title: "Conversations That Turned Into Hours",
    body: "We talked about ourselves, our lives, random things, serious things, stupid things. I just thought you were funny. I loved how gentle you were with me, how naturally our conversations happened.",
  },
  {
    icon: "🎙️",
    date: "A Voice That Changed Everything",
    title: "Hearing You For the First Time",
    body: "Your voice was so delicate and sweet. I remember feeling like I was getting attached in a way I couldn't really explain. Something about it made me fall even harder.",
  },
  {
    icon: "🌹",
    date: "Falling Deeper",
    title: "Seeing You & Falling For You",
    body: "I saw your pictures and I was completely gone for you. But what made me fall deeper was getting to know the person behind all of that — your personality, your kindness, your humour.",
  },
  {
    icon: "💻",
    date: "A Memory I'll Always Keep",
    title: "Building Your Website Together",
    body: "I remember how much the project mattered to you. Seeing your excitement when you finally saw it — that moment meant more to me than the website itself. Your happiness made me happy.",
  },
  {
    icon: "💛",
    date: "Right Now",
    title: "Where We Are Today",
    body: "You started as a random Snapchat add. You became someone I cared about. Then someone I couldn't stop thinking about. And somewhere along the way, you became my person.",
  },
];

const LOVE_REASONS = [
  { front: "Your Voice", back: "Your voice is so delicate and sweet. Hearing it for the first time made me fall even harder." },
  { front: "Your Humour", back: "You make me laugh without even trying. I love the way your personality comes through when you talk." },
  { front: "Your Kindness", back: "You were always so gentle with me. You made conversations feel safe and real from the very start." },
  { front: "Your Beauty", back: "Of course you're beautiful — but what I love most is that your beauty isn't limited to how you look." },
  { front: "Your Name", back: "Lamar — light, radiance, golden glow. Your name has become connected to someone I love so deeply." },
  { front: "Your Reactions", back: "Your little reactions, your expressions, your way of talking — I find something new to love every time." },
  { front: "Your Realness", back: "I love how you can be silly one minute and have a meaningful conversation the next. You're simply yourself with me." },
  { front: "Your Mind", back: "The random topics we end up discussing. The things only we understand. I love how your mind works." },
  { front: "Your Laugh", back: "The things we laugh about that probably wouldn't make sense to anyone else. That laughter is one of my favourite sounds." },
  { front: "You, Just You", back: "You don't have to be perfect. You don't have to have it all figured out. You just have to be you — and that's the person I fell for." },
];

const PROMISES = [
  "I want to be someone you can come to when you need someone beside you.",
  "When something amazing happens, I want to be there listening.",
  "When you're proud of yourself, I want to be celebrating with you.",
  "When you have a bad day, you don't have to pretend everything is okay around me.",
  "I will listen. I will try. I will stand beside you.",
  "I want to keep learning you.",
  "I want to keep caring about you.",
  "I want to keep choosing you.",
  "I want more ordinary days that become special simply because we're sharing them.",
  "I don't know what every chapter ahead looks like — but I want to keep writing them with you.",
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Components ──────────────────────────────────────────────────────────────

function HeartBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [popMessages, setPopMessages] = useState<PopMessage[]>([]);
  const counterRef = useRef(0);
  const msgIndexRef = useRef(0);

  const spawnBalloon = useCallback(() => {
    counterRef.current += 1;
    const id = counterRef.current;
    const msgIdx = msgIndexRef.current % BALLOON_MESSAGES.length;
    msgIndexRef.current += 1;
    const balloon: Balloon = {
      id,
      x: 5 + Math.random() * 85,
      size: 52 + Math.random() * 36,
      duration: 14 + Math.random() * 10,
      delay: 0,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      message: BALLOON_MESSAGES[msgIdx],
      popped: false,
      popX: 0,
      popY: 0,
    };
    setBalloons((prev) => [...prev.slice(-18), balloon]);
  }, []);

  useEffect(() => {
    // Staggered initial spawn
    BALLOON_MESSAGES.forEach((_, i) => {
      setTimeout(spawnBalloon, i * 700);
    });
    const interval = setInterval(spawnBalloon, 3200);
    return () => clearInterval(interval);
  }, [spawnBalloon]);

  const popBalloon = useCallback((e: React.MouseEvent, id: number, message: string) => {
    e.stopPropagation();
    const x = e.clientX;
    const y = e.clientY;

    // Mark popped
    setBalloons((prev) => prev.filter((b) => b.id !== id));

    // Pop rings
    const popId = Date.now();
    setPopMessages((prev) => [...prev, { id: popId, x, y, message }]);
    setTimeout(() => {
      setPopMessages((prev) => prev.filter((m) => m.id !== popId));
    }, 2400);

    // Respawn after a beat
    setTimeout(spawnBalloon, 1200);
  }, [spawnBalloon]);

  return (
    <>
      {/* Balloons */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-float"
          style={{
            position: "fixed",
            left: `${b.x}%`,
            bottom: -80,
            zIndex: 50,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            pointerEvents: "none",
          }}
        >
          <div
            className="balloon-body"
            style={{ pointerEvents: "all" }}
            onClick={(e) => popBalloon(e, b.id, b.message)}
          >
            {/* Balloon SVG */}
            <svg
              width={b.size}
              height={b.size * 1.35}
              viewBox="0 0 80 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glow filter */}
              <defs>
                <filter id={`glow-${b.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id={`grad-${b.id}`} cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                  <stop offset="60%" stopColor={b.color} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={b.color} stopOpacity="1" />
                </radialGradient>
              </defs>

              {/* Heart balloon shape */}
              <path
                d="M40 72 C40 72 8 52 8 30 C8 16 18 8 28 8 C34 8 40 14 40 14 C40 14 46 8 52 8 C62 8 72 16 72 30 C72 52 40 72 40 72Z"
                fill={`url(#grad-${b.id})`}
                filter={`url(#glow-${b.id})`}
              />

              {/* Shine */}
              <ellipse cx="30" cy="24" rx="8" ry="5" fill="white" opacity="0.3" transform="rotate(-20 30 24)" />

              {/* Knot */}
              <ellipse cx="40" cy="74" rx="3.5" ry="2.5" fill={b.color} />

              {/* String */}
              <path
                d="M40 76 C38 82 42 88 38 94 C35 100 41 104 40 108"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      ))}

      {/* Pop messages */}
      {popMessages.map((pm) => (
        <div
          key={pm.id}
          className="pop-message"
          style={{ left: pm.x, top: pm.y }}
        >
          {/* Burst rings */}
          <div
            className="pop-ring"
            style={{
              left: pm.x - 30,
              top: pm.y - 30,
              width: 60,
              height: 60,
              border: "3px solid #FFCB45",
            }}
          />
          <div
            className="pop-ring"
            style={{
              left: pm.x - 18,
              top: pm.y - 18,
              width: 36,
              height: 36,
              border: "2px solid #D4AF37",
              animationDelay: "0.06s",
            }}
          />

          {/* Message card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(90,31,53,0.97), rgba(75,56,50,0.97))",
              border: "1.5px solid rgba(212,175,55,0.7)",
              borderRadius: 20,
              padding: "12px 22px",
              boxShadow: "0 0 30px rgba(212,175,55,0.4), 0 8px 32px rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                fontSize: 28,
                color: "#FFCB45",
                textShadow: "0 0 12px rgba(255,203,69,0.5)",
                margin: 0,
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              {pm.message}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const emojis = ["❤️", "💛", "✨", "💖", "🌹", "💫", "🌟", "💝"];
    const initial: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(initial);
    counterRef.current = initial.length;

    const interval = setInterval(() => {
      counterRef.current += 1;
      const id = counterRef.current;
      setHearts((prev) => [
        ...prev.slice(-20),
        {
          id,
          x: Math.random() * 100,
          size: 16 + Math.random() * 20,
          duration: 8 + Math.random() * 12,
          delay: 0,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="float-heart"
          style={{
            left: `${h.x}%`,
            bottom: "-40px",
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: 0.35,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}

function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleMove = (e: MouseEvent) => {
      clearTimeout(timeout);
      if (!containerRef.current) return;
      const el = document.createElement("div");
      el.className = "cursor-sparkle";
      el.style.left = `${e.clientX - 4}px`;
      el.style.top = `${e.clientY - 4}px`;
      el.style.background = Math.random() > 0.5 ? "#D4AF37" : "#FFCB45";
      el.style.width = `${4 + Math.random() * 6}px`;
      el.style.height = el.style.width;
      containerRef.current.appendChild(el);
      timeout = setTimeout(() => el.remove(), 800);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }} />;
}

function NavDots({ sections, active }: { sections: string[]; active: number }) {
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {sections.map((s, i) => (
        <button
          key={s}
          className={`nav-dot ${active === i ? "active" : ""}`}
          title={s}
          onClick={() => {
            document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="section-0"
      className="bg-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      {/* Radial glow backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(90,31,53,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
        {/* Top badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: 100,
            padding: "6px 18px",
            marginBottom: 32,
            fontSize: 13,
            color: "#D4AF37",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>✦</span> A gift made just for you <span>✦</span>
        </div>

        {/* Main title */}
        <h1
          className="script shimmer-text"
          style={{ fontSize: "clamp(56px, 14vw, 120px)", lineHeight: 1.1, marginBottom: 8 }}
        >
          Happy Birthday
        </h1>

        <h2
          className="script glow-text"
          style={{ fontSize: "clamp(48px, 12vw, 100px)", lineHeight: 1.1, marginBottom: 32 }}
        >
          Lamar
        </h2>

        <p
          className="serif"
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "rgba(240,232,216,0.75)",
            fontStyle: "italic",
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          Ya Lammy — this little place on the internet exists for one reason only.<br />
          Because you're worth every second it took to make it.
        </p>

        {/* Scroll CTA */}
        <button
          className="pulse-btn"
          onClick={() => document.getElementById("section-1")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "linear-gradient(135deg, #D4AF37, #FFCB45)",
            border: "none",
            borderRadius: 100,
            padding: "14px 36px",
            color: "#10102A",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          Open your gift ✦
        </button>

        {/* Scroll arrow */}
        <div className="bounce-arrow" style={{ marginTop: 48, color: "rgba(212,175,55,0.5)", fontSize: 22 }}>
          ↓
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{ position: "absolute", top: 24, left: 24, fontSize: 28, opacity: 0.25 }}>✦</div>
      <div style={{ position: "absolute", top: 24, right: 24, fontSize: 28, opacity: 0.25 }}>✦</div>
      <div style={{ position: "absolute", bottom: 24, left: 24, fontSize: 28, opacity: 0.25 }}>✦</div>
      <div style={{ position: "absolute", bottom: 24, right: 24, fontSize: 28, opacity: 0.25 }}>✦</div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section
      id="section-1"
      className="bg-section"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#D4AF37", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            ✦ how we got here ✦
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#f0e8d8", marginBottom: 16 }}>
            Our Story
          </h2>
          <div className="divider" />
        </div>

        {/* Timeline items */}
        <div style={{ position: "relative" }}>
          {/* Center line (desktop only) */}
          <div
            className="timeline-line"
            style={{ display: "none" }}
            id="timeline-line-desktop"
          />

          {TIMELINE.map((item, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={i}
                className="reveal"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  marginBottom: 48,
                  flexDirection: "column",
                }}
              >
                {/* Card */}
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(75,56,50,0.8), rgba(111,68,54,0.6))",
                    border: "1px solid rgba(212,175,55,0.2)",
                    borderRadius: 16,
                    padding: "24px 28px",
                    width: "100%",
                    position: "relative",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Icon + date */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#D4AF37",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <h3
                    className="serif"
                    style={{ fontSize: "clamp(18px, 3vw, 22px)", color: "#FFCB45", marginBottom: 10 }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(240,232,216,0.8)", fontSize: 15, lineHeight: 1.75 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LoveLetterSection() {
  const [revealed, setRevealed] = useState(false);

  const fullLetter = `I honestly don't know if there is a perfect way to start this, because there is so much I want to say to you and somehow every time I try to put what I feel into words, it never feels like enough. But today is your birthday, and more than anything, I wanted to give you something that came from me and that you could keep. That's why I made this website for you.

Sometimes I genuinely think about how strange it is that we even found each other. I saw your profile picture on Snapchat and randomly added you without having any idea who you would become to me. Then you added me back because you liked my baby picture — and somehow that tiny, random moment became the beginning of everything.

Then we started talking, and slowly I started getting to know you. I liked how gentle you were with me, how naturally our conversations happened, and how comfortable I felt talking to you. Then somewhere along the way, without me planning it or even really noticing it at first, I started caring about you more than I expected.

Then I heard your voice for the first time, and something about it made me fall even harder. Your voice was so delicate and sweet. Then I saw your pictures, and I swear I was completely gone for you. But as much as I was amazed by how beautiful you were, what made me fall deeper was getting to know the person behind all of that.

One memory that will always stay with me is the day we worked on your website project. I remember how much the project mattered to you. Seeing your happiness made me happy. Knowing that something I had put my time and effort into had made your day better made every second worth it.

That's also why making this website for your birthday felt so right to me. I wanted to put memories here, words here, things that remind me of you. I was thinking about my Lammy, my mummy, my ottaty, my ro7 alby. I was thinking about the girl I randomly added on Snapchat and how somehow she became someone I would spend hours making a birthday website for.

There is so much about you that I love, and I don't mean only the obvious things. I love your sense of humour. I love your little reactions. I love the way you can make me laugh without even trying. The more I get to know you, the more things I find to love.

And I love your name too. Lamar Abdullah Al Asiry. Your name has become connected to a person I love so deeply. To me, Lamar means the girl I met by complete chance and somehow ended up loving with my whole heart.

I want to be there for you not just in the good moments but through all the different parts of life. I can't promise that I'll always know exactly what to say, but I can promise that I will care. I will listen. I will try. I will stand beside you.

I want to keep making memories with you. More ordinary days that somehow become special. More conversations that last way longer than they were supposed to. More stupid jokes that only we understand. More memes. More stories.

I don't know what every chapter ahead of us will look like — but I know one thing. I want to keep writing them with you.

Ya Lammy, you have become such a beautiful part of my life. You started as a random Snapchat add. You became someone I talked to. Then someone I cared about. Then someone I couldn't stop thinking about. And somewhere along the way, you became my person, my family, my queen, my wife, my mummy, my ottaty, my ro7 alby.

Happy birthday, my love. I love you, Lamar — so incredibly, insanely much.`;

  return (
    <section
      id="section-2"
      style={{
        background: "linear-gradient(180deg, #0d0815 0%, #10102A 100%)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#D4AF37", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            ✦ from my heart to yours ✦
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#f0e8d8", marginBottom: 16 }}>
            A Letter For You
          </h2>
          <div className="divider" />
        </div>

        <div
          className="reveal letter-paper"
          style={{
            borderRadius: 20,
            padding: "clamp(24px, 5vw, 56px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Paper texture lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${60 + i * 32}px`,
                height: 1,
                background: "rgba(212,175,55,0.04)",
              }}
            />
          ))}

          {/* Letter opener */}
          <div
            className="script"
            style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              color: "#D4AF37",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            My dearest Lamar,
          </div>

          {/* Letter content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxHeight: revealed ? "none" : "320px",
              overflow: "hidden",
              transition: "max-height 1s ease",
            }}
          >
            {fullLetter.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  color: "rgba(240,232,216,0.88)",
                  fontSize: "clamp(14px, 2vw, 16px)",
                  lineHeight: 1.9,
                  marginBottom: 20,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300,
                }}
              >
                {para}
              </p>
            ))}

            {/* Gradient mask when collapsed */}
            {!revealed && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 120,
                  background: "linear-gradient(to bottom, transparent, #2d1a10)",
                }}
              />
            )}
          </div>

          {/* Signature */}
          {revealed && (
            <div style={{ textAlign: "right", marginTop: 32 }}>
              <div className="script" style={{ fontSize: 32, color: "#D4AF37" }}>
                With all my love ❤️
              </div>
            </div>
          )}

          {/* Read more button */}
          {!revealed && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button
                onClick={() => setRevealed(true)}
                className="pulse-btn"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #FFCB45)",
                  border: "none",
                  borderRadius: 100,
                  padding: "12px 32px",
                  color: "#10102A",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Read the full letter ✦
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      style={{ height: 160, width: "100%" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className="flip-card-front"
          style={{
            background: "linear-gradient(135deg, #4B3832, #6F4436)",
            border: "1px solid rgba(212,175,55,0.25)",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 28 }}>💛</div>
          <p
            className="serif"
            style={{ color: "#FFCB45", fontSize: 18, textAlign: "center", fontWeight: 600 }}
          >
            {front}
          </p>
          <p style={{ color: "rgba(240,232,216,0.4)", fontSize: 11, letterSpacing: "0.1em" }}>
            tap to reveal
          </p>
        </div>
        {/* Back */}
        <div
          className="flip-card-back"
          style={{
            background: "linear-gradient(135deg, #5A1F35, #4B3832)",
            border: "1px solid rgba(212,175,55,0.4)",
            boxShadow: "0 0 20px rgba(212,175,55,0.15)",
          }}
        >
          <p
            style={{
              color: "rgba(240,232,216,0.9)",
              fontSize: 14,
              lineHeight: 1.75,
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
            }}
          >
            {back}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReasonsSection() {
  return (
    <section
      id="section-3"
      className="bg-section"
      style={{ padding: "100px 24px" }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#D4AF37", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            ✦ things about you ✦
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#f0e8d8", marginBottom: 16 }}>
            Reasons I Love You
          </h2>
          <div className="divider" />
          <p style={{ color: "rgba(240,232,216,0.6)", fontSize: 14, marginTop: 8 }}>
            Tap each card to reveal
          </p>
        </div>

        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {LOVE_REASONS.map((r, i) => (
            <FlipCard key={i} front={r.front} back={r.back} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NameSection() {
  return (
    <section
      id="section-4"
      style={{
        background: "linear-gradient(135deg, #1a0822 0%, #10102A 40%, #2a1010 100%)",
        padding: "100px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className="reveal">
          <p style={{ color: "#D4AF37", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32 }}>
            ✦ the meaning behind the name ✦
          </p>

          {/* Big shimmering name */}
          <div
            className="script shimmer-text"
            style={{
              fontSize: "clamp(64px, 18vw, 140px)",
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            Lamar
          </div>

          {/* Meaning pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginBottom: 40,
            }}
          >
            {["Light", "Radiance", "Brilliance", "Golden Glow", "Something Shimmering"].map((w) => (
              <span
                key={w}
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.35)",
                  borderRadius: 100,
                  padding: "6px 18px",
                  fontSize: 13,
                  color: "#FFCB45",
                  letterSpacing: "0.08em",
                }}
              >
                {w}
              </span>
            ))}
          </div>

          <p
            className="serif"
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "rgba(240,232,216,0.8)",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}
          >
            "When I hear Lamar, I don't think about a dictionary definition anymore.
            I think about you. Your name has become connected to a person I love so deeply,
            and that makes it beautiful to me in a way that no definition could really explain."
          </p>

          <div
            style={{
              marginTop: 40,
              fontSize: "clamp(16px, 2.5vw, 18px)",
              color: "#D4AF37",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}
          >
            Lamar Abdullah Al Asiry — my Lammy, my mummy, my ottaty, my ro7 alby.
          </div>
        </div>
      </div>
    </section>
  );
}

function PromisesSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % PROMISES.length);
        setVisible(true);
      }, 600);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="section-5"
      style={{
        background: "linear-gradient(180deg, #10102A 0%, #0d0815 50%, #10102A 100%)",
        padding: "100px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <p style={{ color: "#D4AF37", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            ✦ what I want for us ✦
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#f0e8d8", marginBottom: 16 }}>
            My Promises to You
          </h2>
          <div className="divider" />
        </div>

        {/* Promise rotator */}
        <div
          className="reveal"
          style={{
            minHeight: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <p
            className="serif"
            style={{
              fontSize: "clamp(20px, 4vw, 32px)",
              color: "#FFCB45",
              fontStyle: "italic",
              lineHeight: 1.6,
              transition: "opacity 0.6s ease, transform 0.6s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-12px)",
            }}
          >
            "{PROMISES[current]}"
          </p>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 32 }}>
          {PROMISES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setVisible(true); }}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? "#D4AF37" : "rgba(212,175,55,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Final sign-off */}
        <div className="reveal" style={{ marginTop: 80 }}>
          <div
            className="script glow-text"
            style={{ fontSize: "clamp(36px, 8vw, 72px)", marginBottom: 16 }}
          >
            Happy Birthday, my love.
          </div>
          <div
            className="script"
            style={{ fontSize: "clamp(28px, 6vw, 52px)", color: "rgba(212,175,55,0.8)" }}
          >
            I love you, Lamar. ❤️
          </div>
        </div>
      </div>
    </section>
  );
}

function CandleSection() {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const colors = ["#D4AF37", "#FFCB45", "#C68958", "#fff", "#f0e8d8", "#FFCB45", "#5A1F35"];

  const blowOut = useCallback(() => {
    if (blown) return;
    setBlown(true);
    const pieces: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: -60 + Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.5,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2500);
  }, [blown]);

  return (
    <section
      id="section-6"
      style={{
        background: "linear-gradient(180deg, #10102A 0%, #1a0d1a 100%)",
        padding: "100px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p style={{ color: "#D4AF37", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            ✦ make a wish ✦
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 5vw, 44px)", color: "#f0e8d8", marginBottom: 8 }}>
            {blown ? "Your wish is on its way 🌟" : "Blow out your candle, Lammy"}
          </h2>
          <p style={{ color: "rgba(240,232,216,0.6)", fontSize: 14 }}>
            {blown ? "I hope every dream you have comes true." : "Click the flame to make a wish ✨"}
          </p>
        </div>

        {/* Candle */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: blown ? "default" : "pointer",
            position: "relative",
          }}
          onClick={blowOut}
        >
          {/* Confetti */}
          {confetti.map((c) => (
            <div
              key={c.id}
              className="confetti-piece"
              style={{
                left: `calc(50% + ${c.x}px)`,
                top: "30%",
                width: c.size,
                height: c.size,
                background: c.color,
                animationDelay: `${c.delay}s`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}

          {/* Flame */}
          {!blown && (
            <div
              className="flame"
              style={{
                width: 28,
                height: 44,
                background: "radial-gradient(ellipse at 50% 80%, #fff 0%, #FFCB45 30%, #D4AF37 60%, transparent 100%)",
                borderRadius: "50% 50% 35% 35%",
                boxShadow: "0 0 20px #FFCB45, 0 0 40px rgba(212,175,55,0.5)",
                marginBottom: 4,
              }}
            />
          )}
          {blown && (
            <div style={{ fontSize: 36, marginBottom: 4 }}>🌟</div>
          )}

          {/* Wick */}
          <div
            style={{
              width: 3,
              height: 12,
              background: blown ? "#4B3832" : "#2d1a10",
              borderRadius: 2,
            }}
          />

          {/* Candle body */}
          <div
            style={{
              width: 48,
              height: 120,
              background: "linear-gradient(135deg, #FFCB45, #D4AF37, #C68958)",
              borderRadius: "4px 4px 6px 6px",
              position: "relative",
              boxShadow: blown ? "none" : "0 0 30px rgba(212,175,55,0.3)",
            }}
          >
            {/* Drip lines */}
            <div style={{ position: "absolute", top: 4, left: 10, width: 4, height: 20, background: "rgba(255,255,255,0.4)", borderRadius: "0 0 4px 4px" }} />
            <div style={{ position: "absolute", top: 8, right: 12, width: 3, height: 14, background: "rgba(255,255,255,0.3)", borderRadius: "0 0 4px 4px" }} />
          </div>

          {/* Base */}
          <div
            style={{
              width: 70,
              height: 12,
              background: "linear-gradient(135deg, #4B3832, #6F4436)",
              borderRadius: 6,
              marginTop: 4,
            }}
          />

          {!blown && (
            <p style={{ color: "rgba(212,175,55,0.6)", fontSize: 12, marginTop: 16 }}>
              Click to blow out ✦
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #10102A 0%, #080818 100%)",
        padding: "60px 24px 40px",
        textAlign: "center",
        borderTop: "1px solid rgba(212,175,55,0.1)",
      }}
    >
      <div className="script glow-text" style={{ fontSize: 28, marginBottom: 8 }}>
        Made with love, just for you.
      </div>
      <p style={{ color: "rgba(240,232,216,0.4)", fontSize: 13 }}>
        ✦ For Lamar ✦
      </p>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useReveal();

  // Track active section for nav dots
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (let i = 0; i <= 6; i++) {
      const el = document.getElementById(`section-${i}`);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (musicOn) {
    audioRef.current.pause();
    setMusicOn(false);
  } else {
    audioRef.current
      .play()
      .then(() => setMusicOn(true))
      .catch((error) => {
        console.error("Could not play music:", error);
      });
  }
};

  const SECTIONS = ["Home", "Story", "Letter", "Love", "Name", "Promises", "Wish"];

  return (
    <div style={{ position: "relative" }}>
      <FloatingHearts />
      <HeartBalloons />
      <CursorTrail />
      <NavDots sections={SECTIONS} active={activeSection} />

      {/* Music button */}
      <button className="music-btn" onClick={toggleMusic} title="Toggle music">
        {musicOn ? "🔊" : "🎵"}
      </button>

      {/* Audio placeholder */}
     <audio ref={audioRef} loop>
  <source src="/birthday-song.mp3" type="audio/mpeg" />
</audio>

      <HeroSection />
      <TimelineSection />
      <LoveLetterSection />
      <ReasonsSection />
      <NameSection />
      <PromisesSection />
      <CandleSection />
      <Footer />
    </div>
  );
}
