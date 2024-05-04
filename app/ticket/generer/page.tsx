import { GenerateForm } from '@/components/generate-form'

export default function Generer() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">
            Générez votre ticket
          </h1>
          <GenerateForm />
        </div>
      </div>
    </main>
  )
}
