import { Carousel } from "@commons/Carousel";
import { TopBar } from "@commons/TopBar";

export default function Home() {
  const data = [
    {image: "https://picsum.photos/200", title: "Card1", description: "description", rating: 4},
    {image: "https://picsum.photos/200", title: "Card1", description: "description", rating: 4},
    {image: "https://picsum.photos/200", title: "Card1", description: "description", rating: 4},
    {image: "https://picsum.photos/200", title: "Card1", description: "description", rating: 4},
  ]

  return (
    <main className="container" >
      <h1 className="text-5xl text-red-400 font-bold underline">Hello world!</h1>
      <TopBar />
      <Carousel title="Categories" items={data} />
    </main>
  );
}
