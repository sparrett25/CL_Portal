export function getToneEchoForTone(tone = "Neutral") {
  const map = {
    Light: "You are the light within shadow.",
    Neutral: "You are the balance between breath.",
    Dark: "You are the depth in the unknown.",
  };
  return map[tone] || map["Neutral"];
}
