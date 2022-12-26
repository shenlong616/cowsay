import "./App.css";
import { useEffect, useState, startTransition, useRef } from "react";
import { themeChange } from "theme-change";
import { moo } from "cowsayjs";
import { corral } from "cowsayjs/cows";
import { useToggle } from "react-use";
import Typed from "typed.js";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";
import { GoMarkGithub } from "react-icons/go";
import { LoremIpsum } from "lorem-ipsum";

export default function () {
  // https://github.com/saadeghi/daisyui/blob/742f2807155cf496345e0f0b6d26fc17856b763a/src/docs/src/lib/data.js#L16
  const themes = [
    {
      name: "🌝 light",
      id: "light",
    },
    {
      name: "🌚 dark",
      id: "dark",
    },
    {
      name: "🧁 cupcake",
      id: "cupcake",
    },
    {
      name: "🐝 bumblebee",
      id: "bumblebee",
    },
    {
      name: "✳️ Emerald",
      id: "emerald",
    },
    {
      name: "🏢 Corporate",
      id: "corporate",
    },
    {
      name: "🌃 synthwave",
      id: "synthwave",
    },
    {
      name: "👴 retro",
      id: "retro",
    },
    {
      name: "🤖 cyberpunk",
      id: "cyberpunk",
    },
    {
      name: "🌸 valentine",
      id: "valentine",
    },
    {
      name: "🎃 halloween",
      id: "halloween",
    },
    {
      name: "🌷 garden",
      id: "garden",
    },
    {
      name: "🌲 forest",
      id: "forest",
    },
    {
      name: "🐟 aqua",
      id: "aqua",
    },
    {
      name: "👓 lofi",
      id: "lofi",
    },
    {
      name: "🖍 pastel",
      id: "pastel",
    },
    {
      name: "🧚‍♀️ fantasy",
      id: "fantasy",
    },
    {
      name: "📝 Wireframe",
      id: "wireframe",
    },
    {
      name: "🏴 black",
      id: "black",
    },
    {
      name: "💎 luxury",
      id: "luxury",
    },
    {
      name: "🧛‍♂️ dracula",
      id: "dracula",
    },
    {
      name: "🖨 CMYK",
      id: "cmyk",
    },
    {
      name: "🍁 Autumn",
      id: "autumn",
    },
    {
      name: "💼 Business",
      id: "business",
    },
    {
      name: "💊 Acid",
      id: "acid",
    },
    {
      name: "🍋 Lemonade",
      id: "lemonade",
    },
    {
      name: "🌙 Night",
      id: "night",
    },
    {
      name: "☕️ Coffee",
      id: "coffee",
    },
    {
      name: "❄️ Winter",
      id: "winter",
    },
  ];

  themes.unshift({
    name: "Theme",
    id: "",
  });

  const [state1, setState1] = useState();

  const [state2, setState2] = useState(window.innerWidth);

  const [toggle1, setToggle1] = useToggle(true);

  const [toggle2, setToggle2] = useToggle(false);

  const [toggle3, setToggle3] = useToggle(true);

  const ref1 = useRef();

  const refs = useRef([]);

  const className = { gap: { xy: "gap-10" } };

  const Fn = {
    handle: {
      state: {
        2: function () {
          setState2(window.innerWidth);
        },
      },

      loremIpsum: {
        generate: {
          sentences: function () {
            return new LoremIpsum().generateSentences(1);
          },
        },
      },
    },

    components: {
      toast: {
        default: function ({ children }) {
          return <span className="badge-secondary badge">{children}</span>;
        },
      },
    },
  };

  // https://github.com/saadeghi/theme-change
  useEffect(() => {
    themeChange(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", Fn.handle.state[2]);

    return () => window.removeEventListener("resize", Fn.handle.state[2]);
  }, []);

  useEffect(() => {
    // https://mattboldt.github.io/typed.js/docs/
    new Typed(ref1.current, {
      strings: [Fn.handle.loremIpsum.generate.sentences()],
      typeSpeed: 30,
      backSpeed: 25,
      attr: "placeholder",
      loop: true,
      showCursor: false,
      onComplete: function (self) {
        self.strings[0] = Fn.handle.loremIpsum.generate.sentences();
      },
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className={clsx("flex flex-col p-5", className.gap.xy)}>
        <nav className="flex flex-row">
          <h1 className="grow self-center">
            <span className="font-serif text-6xl font-extrabold text-primary">
              cow
            </span>
            <span className="text-xl font-semibold tracking-tight">say</span>
          </h1>
          <select data-choose-theme className="self-end">
            {themes.map((element) => (
              <option value={element.id} key={element.id}>
                {element.id ? element.name.toLowerCase() : element.name}
              </option>
            ))}
          </select>
        </nav>
        <div className="indicator w-full">
          {state1 ? (
            <div className="indicator-bottom indicator-center indicator-item w-max">
              <div className="btn-group">
                <button className="btn-xs" onClick={setToggle2}>
                  {!toggle2 ? "Wrap" : "No wrap"}
                </button>
                <button className="btn-xs" onClick={setToggle1}>
                  {!toggle1 ? "Say" : "Think"}
                </button>
                {/* ?? */}
                {state2 >= 1024 ? (
                  <button className="btn-xs" onClick={setToggle3}>
                    {toggle3 ? "1 column" : "2 columns"}
                  </button>
                ) : undefined}
                <button
                  className="btn-xs"
                  onClick={() =>
                    window.open(
                      "https://github.com/shenlong616/cowsay",
                      "_blank"
                    )
                  }
                  title="GitHub"
                >
                  <GoMarkGithub />
                </button>
              </div>
            </div>
          ) : undefined}
          <TextareaAutosize
            className="w-full"
            ref={ref1}
            minRows={10}
            onChange={(event) => {
              startTransition(() => setState1(event.target.value));
            }}
          />
        </div>
        {state1 ? (
          <div className={clsx("flex flex-col", className.gap.xy)}>
            <div
              className={clsx("grid grid-cols-1", className.gap.xy, {
                ["lg:grid-cols-2"]: toggle3,
              })}
            >
              {corral.map((element, index) => (
                <div key={element.name} className="indicator w-full">
                  <div className="indicator-center indicator-bottom indicator-item w-max">
                    <span className="badge-secondary badge font-mono">
                      {element.name}
                    </span>
                  </div>
                  <textarea
                    // https://stackoverflow.com/questions/57810378/how-to-create-dynamic-refs-in-functional-component-using-useref-hook
                    ref={(ref) => (refs.current[index] = ref)}
                    className="w-full overflow-hidden whitespace-pre font-mono leading-none hover:overflow-auto focus:overflow-auto" // ??
                    value={moo(state1, {
                      cow: element.name,
                      wrap: toggle2,
                      action: toggle1 ? "say" : "think",
                    })}
                    rows={20}
                    onClick={() => refs.current[index].select()}
                    readOnly
                  />
                </div>
              ))}
            </div>
            <div className="self-center">
              <Fn.components.toast.default>{`ò_óˇ End page`}</Fn.components.toast.default>
            </div>
          </div>
        ) : (
          <div className="self-center">
            <Fn.components.toast.default>{`(~˘▾˘)~ Please provide data text field`}</Fn.components.toast.default>
          </div>
        )}
      </div>
    </div>
  );
}
