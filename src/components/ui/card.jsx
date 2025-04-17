export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg bg-white/5 p-4 shadow border border-white/10 ${className}`}>
      {children}
    </div>
  );
}
