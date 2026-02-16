export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="
        bg-primary 
        text-white 
        hover:bg-primary-hover 
        active:bg-primary-active 
        px-4 py-2 
        rounded-md 
        font-semibold
      "
    >
      {children}
    </button>
  )
}