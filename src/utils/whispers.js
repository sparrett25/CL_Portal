export function getWhisperForTone(tone = "Neutral") {
  const whispers = {
    Light: "The stars remember your name.",
    Neutral: "In stillness, you are found.",
    Dark: "There is beauty in what is hidden.",
  };
  return whispers[tone] || whispers["Neutral"];
}
