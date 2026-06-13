/**
 * Reusable page header with a title, optional description, and optional right-side actions.
 */
export function PageHeader({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="space-y-1.5">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">{title}</h1>
        {description && (
          <p className="text-sm md:text-base text-slate-400 font-medium">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
