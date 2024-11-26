interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const LayoutAuth = ({ children }: Props) => {
  return (
    <div className="sm:flex bg-gradient-to-l from-blue-900 to-sky-900 h-screen w-full">
      <header className="hidden sm:block sm:w-2/4">
        <h1>Header</h1>
      </header>
      <main className="flex items-center justify-center h-full p-4 sm:w-2/4 sm:bg-slate-100">
        <div className="bg-white p-2 rounded-lg shadow-sm shadow-sky-200 w-full sm:max-w-md sm:shadow-md sm:border sm:border-gray-300">
          {children}
        </div>
      </main>
    </div>
  )
}
