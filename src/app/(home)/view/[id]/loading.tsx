import LoadingState from "@/components/SheareUI/LoadingState";

export default function TuitionDetailsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-7 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <LoadingState variant="detail" />
    </main>
  );
}
