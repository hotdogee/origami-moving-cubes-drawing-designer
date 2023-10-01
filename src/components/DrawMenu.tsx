export default function DrawMenu({
  setLineColor,
  setLineWidth,
  setLineOpacity,
}: {
  setLineColor: (color: string) => void
  setLineWidth: (width: number) => void
  setLineOpacity: (opacity: number) => void
}) {
  return (
    <div
      id="Menu"
      className="mx-auto mt-2 flex h-12 w-[650px] items-center justify-evenly rounded-lg bg-gray-400/20"
    >
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value)
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(Number(e.target.value))
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => {
          setLineOpacity(Number(e.target.value) / 100)
        }}
      />
    </div>
  )
}
