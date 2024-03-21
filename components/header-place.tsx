import { texts } from "@/utils/texts";

export function HeaderPlace() {
  return (
    <header className="p-2 flex-1 text-xs md:text-base">
      <div className="flex gap-1 md:gap-2 md:p-2 flex-col items-start">
        <h1 className="text-xs md:text-xl ">
          {texts.conv_place}
        </h1>
        <address className=" border-t-2 pt-1 md:pt-2 border-msx-lightBlue">{texts.conv_address}</address>
      </div>
    </header>
  );
}
