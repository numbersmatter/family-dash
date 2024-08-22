
export function SemesterGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-100 rounded-lg p-4">
        <h2 className="text-lg font-semibold">Fall 2024 Semester</h2>
        <p className="text-sm text-muted-foreground">
          August - December 2024
        </p>
      </div>
      <div className="bg-slate-100 rounded-lg p-4">
        <h2 className="text-lg font-semibold">Spring 2025 Semester</h2>
        <p className="text-sm text-muted-foreground">
          January - May 2025
        </p>
      </div>
    </div>
  )
}

