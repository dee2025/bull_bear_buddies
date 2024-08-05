export default function Heading({ headingText }) {
  return (
    <span className="relative flex justify-center mb-4">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-teal-600 to-transparent opacity-90"></div>

      <span className="relative z-10 bg-black px-6 text-teal-300">{headingText}</span>
    </span>
  );
}
