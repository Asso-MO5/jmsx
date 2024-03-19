export default function NotFound() {
  return (
    <>
      <title>404: Manchot non trouvé</title>
      <div className="flex flex-1 items-center justify-center h-96 bg-msx-lightBlue p-4 gap-3 flex-col">
        <img
          src="/penguin.gif"
          className="drop-shadow-md"
          alt="404"
          height={32}
          width={32}
        />
        {"Page non trouvée !"}
      </div>
    </>
  );
}
