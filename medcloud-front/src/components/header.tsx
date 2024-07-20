export function Header() {
    return(
        <div className="flex items-center justify-center px-10 py-4 sticky border-b border-b-black/20 shadow-lg">
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <img className="h-6" src="logo.svg" alt="" />
            </div>
            <div>
                <div className="rounded-md border border-zinc-200 px-8 py-0.5 flex justify-center">
                    <span className="text-sm">04 de janeiro de 2023</span>
                </div>
            </div>
        </div>
    )
}