import type { ComponentProps } from 'react'
import { Flower } from './Flower'

export function Sunflower(props: ComponentProps<typeof Flower>) {
  return <Flower {...props} flower={{ ...props.flower, kind: 'sunflower' }} />
}
