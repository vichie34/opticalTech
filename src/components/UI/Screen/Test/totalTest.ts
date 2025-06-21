// import { useState } from "react";
// import { LeaSymbolsTest } from "./LeaSymbolsTest";
// import { TumblingETest } from "./TumblingETest";
// import { ColorBlindnessTest } from "./ColorBlindnessTest";
// // ...other imports

// export const VisionTestFlow = () => {
//   const [step, setStep] = useState(0);

//   const saveResultToBackend = (testName: string, result: { score: number; distance: number }) => {
//     // Send to backend here (API call)
//     console.log("Saving", testName, result);
//     setStep(step + 1); // Move to next test
//   };

//   return (
//     <>
//       {step === 0 && <TumblingETest onComplete={result => saveResultToBackend('Tumbling E', result)} />}
//       {step === 1 && <LeaSymbolsTest onComplete={result => saveResultToBackend('Lea Symbols', result)} />}
//       {step === 2 && <ColorBlindnessTest onComplete={result => saveResultToBackend('Color Blindness', result)} />}
//       {/* ...other tests */}
//     </>
//   );
// };