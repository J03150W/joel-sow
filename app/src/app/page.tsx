import Terminal from "./components/terminal";
import Template from "./components/template";
import Experience from "./experience/page";
import About from "./about/page";

export default function Home() {
  return (
    <Template>
      <Terminal />
      <Experience />
      <About />
    </Template>
  );
}
