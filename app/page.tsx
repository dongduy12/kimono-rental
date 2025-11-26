import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-rose-100">
      <div className="p-8 bg-white rounded-2xl shadow text-center">
        <h1 className="text-3xl font-bold text-rose-600 mb-2">
          Tailwind v4 OK ✅
        </h1>
        <p className="text-slate-600">
          Nếu bạn thấy box này là Tailwind đã hoạt động rồi.
        </p>
      </div>
    </main>
  );
}
