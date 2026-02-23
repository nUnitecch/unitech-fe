import Image from "next/image";
import { FadeFeatureInView } from "../FadeInView";

type DetailsType = {
  details: {
    icon: string;
    title: string;
    desc: string;
  };
};

export default function FeatureCard({ details }: DetailsType) {
  return (
    <FadeFeatureInView className="flex flex-col gap-y-[38.63px] border-[1.42px] border-border min-w-[169.26px] py-[15.24px] px-[15.38px] rounded-tl-[15.95px] rounded-br-[15.95px]">
      <div className="self-end">
        <div className="min-w-[40.06px] h-[40.06px] rounded-full p-[4.96px] bg-logo flex items-center justify-center">
          <Image
            src={details.icon}
            alt="grduation cap"
            className="object-contain"
            width={25.95}
            height={23.11}
            sizes="500px"
          />
        </div>
      </div>
      <div className="space-y-[7.87px]">
        <h1 className="text-[20.01px] font-bold text-primary-text w-[174.5px]">
          {details.title}
        </h1>
        <p className="text-[16px]">{details.desc}</p>
      </div>
    </FadeFeatureInView>
  );
}
