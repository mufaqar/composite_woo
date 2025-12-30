import Image from "next/image";
import Banner from "@/components/Banner";
import FaqsSection from "@/components/FaqSection";
import FollowInsta from "@/components/Product/FollowInsta";
import client from "@/lib/apollo-client";
import {GetFaqs } from "@/lib/gql-types";
import { GET_FAQS } from "@/lib/queries/getFaqs";

export default async function FAQPage() {
  const { data } = await client.query<GetFaqs>({
    query: GET_FAQS,
  });

  const faqs_Cat = data?.faqs?.nodes;


  return (
    <main>
      <Banner
        title="FAQS"
        img={"/images/fencing.png"}
        desc="Free ask questions"
      />

      <div className="relative ">
        <Image
          src="/images/boxes-right.png"
          alt="boxes-right"
          width={232}
          height={155}
          className=" md:w-[100px] md:h-[155px] w-[87.5px] h-[58.33] absolute top-0 right-0"
        />
        <FaqsSection title="Composite Fencing FAQ" faqs={faqs_Cat} />
      </div>
      <FollowInsta />
    </main>
  );
}
