export default function FramedImage({ src }: { src: string }) {
  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center w-full max-w-[32rem] mx-auto"
    >
      <div className="flex items-center gap-4">
        <div className="w-[2.5rem]" />

        <div className="w-full max-w-[14rem] md:max-w-[20rem] 2xl:max-w-[32rem] aspect-[3/4] max-h-[32rem] overflow-hidden shadow-lg mx-auto">
          <img src={src} alt="Framed" className="w-full h-full object-cover" />
        </div>

        <div className="w-[2.5rem]" />
      </div>

      <div className="h-3" />
    </div>
  );
}
