import { Articles } from '@/components/articles'

export default function Actu() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px]  m-auto">
      <div className="flex flex-col gap-2 items-center justify-center p-2">
        <h1 className="text-msx-lightBlue">{"L'actualité JMSX"}</h1>
        <Articles />
      </div>
    </main>
  )
}
