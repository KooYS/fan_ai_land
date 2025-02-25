import Image from "next/image";

export default function Home() {
  return (
    <div className="container-wrapper">
      <div>
        <Image src="/images/banner.jpg" alt="main banner" width={1500} height={500} className="m-auto w-full" />
      </div>
      <div className="container flex flex-col justify-center py-6 gap-3">
        <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
          <h1 className="text-xl font-bold">RANKING</h1>
          <div>1</div>
        </div>
        <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
          <h1 className="text-xl font-bold">STORE</h1>
          <div>1</div>
        </div>
        <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
          <h1 className="text-xl font-bold">RECENT</h1>
          <div>1</div>
        </div>
      </div>
    </div>
  );
}
