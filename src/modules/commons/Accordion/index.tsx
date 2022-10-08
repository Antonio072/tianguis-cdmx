import React, { useEffect } from "react";
import useToggle from "../../../hoooks/useToggleStatus";

const CaretDownSvg = () => {
  return <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none"
              stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
  </svg>;
};


const AccordionToggle = ({
                           title,
                           onToggle
                         }: { title: string, onToggle: any }) => {
  return <button
    className={"accordion-toggle"}
    type="button" onClick={onToggle}>
    {title}
    <CaretDownSvg />
  </button>;
};


const AccordionBody = ({ children }: { children: React.ReactNode }) => {
  return <div className={"accordion-body"}>
    {children}
  </div>;
};
const combineClassNames = (...classNames: string[]) => {
  try {
    return classNames.filter(c => c).join(" ");
  } catch (ex) {
    return "";
  }
};


export const Accordion = ({
                            children,
                            title,
                            isOpen
                          }: { children: React.ReactNode, title: string, isOpen?: boolean }) => {

  const isControlled = isOpen !== undefined;
  const { setState: setAccordionBodyVisible, toggle: toggleAccordionBody, state: isBodyVisible } = useToggle(false);
  useEffect(() => {
    if (isControlled) {
      setAccordionBodyVisible(isOpen);
    }
  }, [isOpen, isControlled]);


  return (
    <>
      <div className={"accordion-container"}>
        <AccordionToggle title={title} onToggle={toggleAccordionBody} />
        {isBodyVisible && <>
          <AccordionBody>
            {children}
          </AccordionBody>
        </>}
      </div>
    </>
  );
};
