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
          I’m a passionate software developer who discovered coding at 16—and
          never looked back. Today, I specialize as a frontend engineer with a
          strong focus on JavaScript, <strong>TypeScript</strong>,{' '}
          <strong>React</strong>, and <strong>React Native</strong>. I also work
          across DevOps, setting up and managing infrastructure with{' '}
          <strong>Docker</strong>, <strong>Kubernetes</strong>, and{' '}
          <strong>CI/CD pipelines</strong> to ensure smooth, automated
          deployments.
        </p>
      </article>
    </>
  )
}
