import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";

import { CarouselCard } from "@commons/CarouselCard"

export const Carousel = ({ title, items }) : any => {
  const [isMobile, setIsMobile] = useState(true) 
  const [scrollCount, setScrollCount] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    const viewportWidth = window.innerWidth
    if(viewportWidth > 768){
      setIsMobile(false)
    }
  }, [])
  
  const nextItem = () => {
    setScrollCount(scrollCount + 500)
    carouselRef.current.scroll({
      top: 0,
      left: scrollCount,
      behavior: "smooth"
    })
  }
  
  const previousItem = () => {
    if(scrollCount > 0){      
      setScrollCount(scrollCount - 500)
      carouselRef.current.scroll({
        top: 0,
        left: scrollCount,
        behavior: "smooth"
      })
    }
  }

  return (
    <section>
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2" >{title}</h2>
      {isMobile ? (
        <ul className={`flex ${styles.carousel}`} >
          {items.map((item: any) => (
            <CarouselCard key={item.image} image={item.image} title={item.title} description={item.description} rating={item.rating} />
          ))}
        </ul>
      )
        :
        (
          <div className={styles["container-desktop"]}  >
            <button className={` bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${styles.left}`} onClick={previousItem}>Prev</button>
            <ul ref={carouselRef} className={`flex ${styles.carousel}`} >
              {items.map((item: any) => (
                <CarouselCard key={item.image} image={item.image} title={item.title} description={item.description} rating={item.rating} />
              ))}
            </ul>
            <button className={` bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${styles.right}`} onClick={nextItem} >Next</button>
          </div>
        )
      }
    </section>
  )
 }
