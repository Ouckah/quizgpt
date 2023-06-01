import Generator from "./components/Generator";

export default function Generate() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <h1>Generator</h1>
            <div className="flex h-[35em] w-full flex-row gap-8">
                <div className="w-1/2 h-full">
                    <Generator />
                </div>
                <div className="flex w-1/2 h-full flex-col bg-blue-400">
                    
                </div>
            </div>

        </main>
    )
}