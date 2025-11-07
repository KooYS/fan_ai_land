'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Separator } from "@/ui/separator";

export const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer id="footer" className="border-grid border-t">
      <div className="container-wrapper ">
        <div className="container p-10 border-secondary py-[40px] px-[20px] lg:px-[90px] xl:px-[240px] m-auto">
          <div className="flex items-center gap-4">
            <div>
              <Link href="#" className="flex font-bold items-center mr-2">
                <h3 className="text-2xl">{t('companyName')}</h3>
              </Link>
            </div>
            <div className="w-full  gap-2 flex">
              <Link href="https://maps.app.goo.gl/cpkG8urzYhEsx42o9" className="flex items-center">
                <h3 className="text-base">{t('directions')}</h3>
              </Link>
            </div>
          </div>
          <Separator className="my-6" />
          <section className="flex flex-col gap-1 text-sm">
            <div>{t('companyName')}</div>
            <div className="gap-2 hidden sm:flex ">
              <div>{t('representative')}</div>
              <Separator
                orientation="vertical"
                className="h-[10px] mx-2 my-auto"
              />
              <div>{t('businessNumber')}</div>
            </div>
            <div className="flex flex-col gap-1 sm:hidden">
              <div>{t('representative')}</div>
              <div>{t('businessNumber')}</div>
            </div>
            <div>
              {t('address')}
            </div>
            <div>
              <a href="mailto:help@duckzill.com">{t('email')}</a>
            </div>

            <h3 className="mt-3 text-[#8f8f8f]">
              {t('copyright')}
            </h3>
          </section>
        </div>
      </div>
    </footer>
  );
};
