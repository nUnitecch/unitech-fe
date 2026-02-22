import Image from "next/image";

type AboutCardType = {
  title: string;
  description: string;
  imageUrl: string;
};

export default function AboutCard({
  title,
  description,
  imageUrl,
}: AboutCardType) {
  return (
    <div className="about-card grid grid-cols-1 gap-[11.33px] md:grid-cols-2 md:gap-4">
      <div className="card-desc rounded-[5.85px] overflow-hidden p-5 shadow-lg ">
        <div>
          <h2 className="text-[24px] font-bold mb-5">{title}</h2>
          <p className="leading-[24.5px]">{description}</p>
        </div>
      </div>
      <div className="min-w-50 w-full aspect-video rounded-[5.85px] overflow-hidden relative">
        <Image
          src={`/images/${imageUrl}`}
          alt={title}
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
