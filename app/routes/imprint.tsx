import type { MetaFunction } from '@remix-run/react'
import { BaseLayout } from '~/components/BaseLayout'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Imprint',
    },
  ]
}

function Imprint() {
  return (
    <BaseLayout>
      <br />
      <br />
      <br />
      <h1>Imprint</h1>
      <br />
      <p>
        <strong>Responsible for this website:</strong>
        <br />
        Patrick Wozniak
        <br />
        Nürnberger Str. 4
        <br />
        90571 Schwaig
        <br />
      </p>
    </BaseLayout>
  )
}

export default Imprint
