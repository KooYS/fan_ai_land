import Link from "next/link";
import { Separator } from "@/ui/separator";

export const Footer = () => {
  return (
    <footer id="footer" className="border-grid border-t">
      <div className="container-wrapper ">
        <div className="container p-10 border-secondary py-[40px] px-[20px] lg:px-[90px] xl:px-[240px] m-auto">
          <div className="flex items-center gap-4">
            <div>
              <Link href="#" className="flex font-bold items-center mr-2">
                <h3 className="text-2xl">AMP</h3>
              </Link>
            </div>
            <div className="w-full  gap-2 flex">
              <Link href="https://maps.app.goo.gl/cpkG8urzYhEsx42o9" className="flex items-center">
                <h3 className="text-base">오시는길</h3>
              </Link>
            </div>
          </div>
          <Separator className="my-6" />
          <section className="flex flex-col gap-1 text-sm">
            <div>AMP</div>
            <div className="gap-2 hidden sm:flex ">
              <div>이종석</div>
              <Separator
                orientation="vertical"
                className="h-[10px] mx-2 my-auto"
              />
              <div>248-86-01376</div>
            </div>
            <div className="flex flex-col gap-1 sm:hidden">
              <div>구영서</div>
              <div>248-86-01376</div>
            </div>
            <div>
              서울 종로구 청계천로 85 904호
            </div>
            <div>
              <a href="mailto:help@duckzill.com">help@duckzill.com</a>
            </div>

            <h3 className="mt-3 text-[#8f8f8f]">
              &copy; 2024 AMP. All Rights Reserved
            </h3>
          </section>
        </div>
      </div>
    </footer>
  );
};
