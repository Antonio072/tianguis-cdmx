import dynamic from "next/dynamic";

const Map = dynamic(() => import("../modules/Map/components/Map/Map"), { ssr: false });

export default function Home() {
  return (
    <Map />
  );
}
