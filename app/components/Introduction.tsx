export const Introduction = () => {
  return (
    <>
      <div className="flow-root">
        <img
          className="float-left mr-4 rounded-xl shadow-sm"
          src="/me.jpg"
          width="128"
          height="128"
          alt="Face of Patrick Wozniak"
        />
        <p className="my-2 text-xl">Hello 👋</p>
        <p className="text-slate-600">I’m</p>
        <h3 className="font-semibold text-xl">Patrick Wozniak</h3>
        <p className="text-slate-600">Software Engineer</p>
      </div>

      <article className="prose lg:prose-lg mt-12">
        <p>
          I'm a software developer who discovered my passion for coding at the age of 16, and since
          then, I've become an experienced frontend engineer with a strong focus on
          JavaScript/TypeScript and React/React Native.
        </p>
      </article>
    </>
  )
}
