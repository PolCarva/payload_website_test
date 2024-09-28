import React from 'react'

import { Gutter } from '../../_components/Gutter'
import classes from './index.module.scss'

type Props = { text: string }

export const TestingBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ text }) => {
  return (
    <Gutter>
      <h1 className={classes.h1}>{text}</h1>
    </Gutter>
  )
}
