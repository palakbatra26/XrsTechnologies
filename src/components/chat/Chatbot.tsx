import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
};

const CONTACT_INFO =
  "VproTech Digital, SCF-116, Second Floor, Industrial Area Sector 58, Phase-5, Mohali 160059. Email: vprotechdigital@gmail.com. Web: https://vprotechdigital.com. Phone: 172-4639508, 8146759497.";

const SUGGESTED_QUESTIONS = [
  "Company profile",
  "Mission and vision",
  "Courses and training",
  "Services",
  "Placements and industry tie-ups",
  "Team",
  "Contact details",
  "Clients",
  "Why choose us",
  "ISO certification",
  
];

const WELCOME_MESSAGE =
  "Hi! I can help with VproTech Digital info. Ask about company profile, team, mission/vision, trainings, services, placements, or contact details.";

const getReply = (message: string) => {
  const text = message.toLowerCase();

  if (
    text.includes("hi") ||
    text.includes("hello") ||
    text.includes("hii") ||
    text.includes("how are you")
  ) {
    return "Hi! I’m doing well, thanks for asking. How can I help you today? You can ask about the company profile, team, mission/vision, trainings, services, or contact details.";
  }

  if (text.includes("about") || text.includes("company") || text.includes("profile")) {
    return "VproTech Digital is a software and training company founded in 2016. We focus on software solutions, innovative ideas, and job-oriented training across CSE/IT, mechanical, civil, electronics, and more. We operate under ISO 9001:2015 standards.";
  }

  if (text.includes("mission") || text.includes("vision")) {
    return "Our mission is to cultivate creativity and a passion for learning, foster career and academic success, and provide an accessible, affordable learning environment for certified courses. Our vision is to provide excellent opportunities that empower students to meet challenges and shape the future.";
  }

  if (text.includes("philosophy")) {
    return "Our philosophy is practical, industry-relevant training, information security awareness, and continual learning to meet international best practices.";
  }

  if (text.includes("values")) {
    return "Our values include strengthening students, excellence, collaboration with industry, and technical advancement through cutting-edge technology.";
  }

  if (text.includes("services")) {
    return "We provide software development across Agile, Scrum, Lean, Waterfall, Prototype, Incremental, Iterative, and V-Model. We also offer risk management, quality control, business process re-engineering, network risk analysis, software testing, mobile app testing, wireless/network penetration testing, and application security testing.";
  }

  if (text.includes("training") || text.includes("courses") || text.includes("syllabus")) {
    return "We offer job-oriented trainings in CSE/IT, Mechanical, Civil, and ECE/Electrical. Courses include web designing, C/C++, Java, Python, digital marketing, CAD tools, and more.";
  }

  if (text.includes("iso") || text.includes("certification")) {
    return "We operate under ISO 9001:2015 standards and provide standardized trainings and personality development sessions.";
  }

  if (text.includes("placement") || text.includes("industry") || text.includes("tie up")) {
    return "We provide job-oriented trainings with placement tie-ups across India. CSE/IT industry partners include  Evervent, Ingebious, Beatum IT Solution, Zeligz Technologies, Vienna IT Solution, Sagmetic Infotech, and Enzoo IT Services.";
  }

  if (text.includes("mechanical") || text.includes("mech")) {
    return "Mechanical trainings include AutoCAD 2D/3D, SolidWorks, CATIA, Pro-E/Creo, CNC Programming, ANSYS, and Inventor/Fusion.";
  }

  if (text.includes("civil")) {
    return "Civil trainings include AutoCAD 2D/3D, Revit, STAAD Pro, 3DS Max, Google SketchUp, E-Tab, and Primavera.";
  }

  if (text.includes("ece") || text.includes("electrical") || text.includes("electronics")) {
    return "ECE/Electrical trainings include Embedded Systems, Automation, MATLAB, VLSI Training, Robotics, Networking, IoT Training, and Android.";
  }

  if (text.includes("client")) {
    return "We serve clients across industries and provide long-term product enhancement. For client-specific details, please contact us.";
  }

  if (text.includes("why choose") || text.includes("why us")) {
    return "Why choose us: goal-oriented, quality-driven process, strong technical competence, skilled workforce, cost efficiency, high product quality, and long-term partnership support.";
  }

  if (text.includes("website") || text.includes("explore") || text.includes("pages")) {
    return "You can explore: Home, About, Services, Training, Team, Portfolio, Career, Contact, FAQ, and Newsletter sections.";
  }

  if (text.includes("team")) {
    return "Our team is professional, young, and experienced, focused on innovative ideas and a strong learning environment.";
  }

  if (text.includes("director") || text.includes("rajat")) {
    return "Rajat Kumar is the Director of VproTech Digital.";
  }

  if (text.includes("hr") || text.includes("mamta")) {
    return "Mamta Panwar is the Human Resources lead at VproTech Digital.";
  }

  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("email") ||
    text.includes("address") ||
    text.includes("website")
  ) {
    return `You can contact us here: ${CONTACT_INFO}`;
  }

  return `I am not sure about that. For more details, please contact us: ${CONTACT_INFO}`;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "bot", text: WELCOME_MESSAGE },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const resetChat = () => {
    setMessages([{ id: "welcome", role: "bot", text: WELCOME_MESSAGE }]);
    setInput("");
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      role: "bot",
      text: getReply(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedClick = (question: string) => {
    setInput(question);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen]);

  const lastMessageId = useMemo(
    () => (messages.length ? messages[messages.length - 1].id : "none"),
    [messages]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] bg-card border border-border shadow-2xl rounded-3xl overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                V
              </div>
              <div>
                <div className="font-semibold text-foreground leading-tight">VproTech Chat</div>
                <div className="text-xs text-foreground/60">Online • Instant replies</div>
              </div>
            </div>
            <button
              className="text-foreground/60 hover:text-foreground"
              onClick={() => {
                setIsOpen(false);
                resetChat();
              }}
              aria-label="Close chat"
            >
              x
            </button>
          </div>
          <div className="max-h-[320px] overflow-y-auto px-4 py-4 space-y-3 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "text-sm leading-relaxed px-3 py-2 rounded-2xl shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground ml-8 rounded-br-md"
                    : "bg-muted text-foreground mr-8 rounded-bl-md"
                )}
              >
                {msg.text}
              </div>
            ))}
            <div id={lastMessageId} ref={bottomRef} />
          </div>
          <div className="border-t border-border px-3 py-2">
            <div className="text-xs font-semibold text-foreground/70 mb-2">
              Quick questions
            </div>
            <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                className="text-xs px-2 py-1 rounded-full border border-border text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => handleSuggestedClick(question)}
              >
                {question}
              </button>
            ))}
            </div>
          </div>
          <div className="border-t border-border p-3 flex gap-2 bg-muted/40">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
            />
            <Button variant="accent" onClick={handleSend}>
              Send
            </Button>
          </div>
        </div>
      )}
      <Button
        variant="accent"
        className="rounded-full px-5 py-6 shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (!next) {
              resetChat();
            }
            return next;
          });
        }}
      >
        {isOpen ? "Close Chat" : "Chat with us"}
      </Button>
    </div>
  );
}
