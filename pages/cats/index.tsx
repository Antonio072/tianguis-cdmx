import React from "react";
import Image from "next/image";

const Main = () => {
  return <div className={"flex justify-center items-center gap-3 flex-col text-center"}>

    <p className={"text-red-200 font-bold text-3xl"}>
      Why are you looking for a cats page? We don't know but we
      are really happy to know that you love cats. Thank you so much
      we hope you to find the tianguis you are looking for.
    </p>
    <Image width={300} height={200}
           src={"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"} />
  </div>;
};

export default Main;
