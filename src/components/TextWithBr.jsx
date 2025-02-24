import React from "react";

export default function TextWithBr({ text }){
    // Usa una regex per suddividere la stringa senza perdere i punti
    const segments = text.split(/(\.)/);
  
    return (
      <>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            {segment}
            {segment === "." && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };