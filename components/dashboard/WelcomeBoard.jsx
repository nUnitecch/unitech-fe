export default function WelcomeBoard() {
  return (
    <section className="flex flex-col gap-3 bg-logo-title px-13 py-10 text-background text-center items-center rounded-xl">
      <h2 className="font-semibold text-2xl">Welcome back, John! </h2>
      <p className="px-5">Your next class is CSC 203 by 2:00 PM </p>
      <div className="flex gap-3.5 text-[14px] mt-3.5">
        <button className="text-logo-title bg-background px-4 py-1 rounded-[9px] ">
          View Timetable
        </button>
        <button className="bg-[#30397E] text-white px-4 py-1 rounded-[9px] ">
          Search Materials
        </button>
      </div>
    </section>
  );
}
