import { texts } from "@/utils/texts";

export function HeaderPlace() {
  return (
    <header className="p-2 flex-1">
      <div className="flex gap-2 p-2 flex-col items-start">
        <h1 className="text-xl">
          {texts.conv_place}
        </h1>
        <address className=" border-t-2 pt-2 border-msx-lightBlue">{texts.conv_address}</address>
      </div>
    </header>
  );
}
