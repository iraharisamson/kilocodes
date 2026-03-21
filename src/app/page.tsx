const chapters = [
  { id: "intro", title: "Introduction to Pharmacognosy", desc: "Learn the fundamentals", icon: "📚", locked: false },
  { id: "primary", title: "Primary Plant Metabolites", desc: "Essential compounds", icon: "🌿", locked: true },
  { id: "secondary", title: "Secondary Plant Metabolites", desc: "Bioactive compounds", icon: "🔬", locked: true },
  { id: "natural-drugs", title: "Drugs from Natural Sources", desc: "Medicinal plants", icon: "💊", locked: true },
  { id: "techniques", title: "Phytochemistry Techniques", desc: "Methods for studying", icon: "⚗️", locked: true },
  { id: "quality", title: "Quality Control of Herbal Drugs", desc: "Ensuring drug quality", icon: "✓", locked: true },
];

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-bold text-xl">PharmaQuest</span>
        </div>
        <div className="flex gap-3.75">
          <span style={{ color: "#FF9600" }}>🔥 0</span>
          <span style={{ color: "#58CC02" }}>⭐ 0</span>
          <span style={{ color: "#FF4B4B" }}>❤️ 5</span>
        </div>
      </header>
      <main className="pt-28 px-5 max-w-[600px] mx-auto pb-8">
        <h1 className="text-[32px] text-[#3C3C3C] text-center mb-2.5">Learn Pharmacognosy</h1>
        <p className="text-center text-[#777] mb-7.5">Master the science of natural drugs</p>
        <div className="flex flex-col gap-3">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`border-2 border-[#E5E5E5] rounded-2xl p-4 flex items-center gap-4 bg-white cursor-pointer transition-colors ${
                chapter.locked ? "opacity-50 cursor-not-allowed" : "hover:border-[#58CC02]"
              }`}
            >
              <div className="w-[60px] h-[60px] rounded-xl bg-[#D7F5D7] flex items-center justify-center text-[28px]">
                {chapter.icon}
              </div>
              <div>
                <h3 className="text-base text-[#3C3C3C] font-semibold mb-1">{chapter.title}</h3>
                <p className="text-sm text-[#777]">{chapter.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
