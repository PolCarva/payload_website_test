import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { fetchComments } from '../../_api/fetchComments'
import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { formatDateTime } from '../../_utilities/formatDateTime'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Debes iniciar sesión para acceder a tu cuenta.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  const comments = await fetchComments({
    user: user?.id,
  })

  return (
    <Fragment>
      <Gutter>
        <RenderParams className={classes.params} />
      </Gutter>
      <LowImpactHero
        type="lowImpact"
        media={null}
        richText={[
          {
            type: 'h1',
            children: [
              {
                text: 'Tu Cuenta',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'Este es el panel de tu cuenta. Aquí puedes actualizar tu información de cuenta, ver tu historial de comentarios y más. Para administrar todos los usuarios, ',
              },
              {
                type: 'link',
                url: '/admin/collections/users',
                children: [
                  {
                    text: 'inicia sesión en el panel de administración.',
                  },
                ],
              },
            ],
          },
        ]}
      />
      <Gutter className={classes.account}>
        <AccountForm />
        <HR />
        <h2>Comentarios</h2>
        <p>
          Estos son los comentarios que has realizado a lo largo del tiempo. Cada comentario está asociado a una publicación específica. Todos los comentarios deben ser aprobados por un administrador antes de que aparezcan en el sitio.
        </p>
        <HR />
        {comments?.length === 0 && <p>Aún no has realizado ningún comentario.</p>}
        {comments.length > 0 &&
          comments?.map((com, index) => {
            const { doc, comment, createdAt } = com

            if (!comment) return null

            return (
              <Fragment key={index}>
                <div className={classes.column}>
                  <p className={classes.comment}>"{comment}"</p>
                  <p className={classes.meta}>
                    {'Publicado '}
                    {doc && typeof doc === 'object' && (
                      <Fragment>
                        {'en '}
                        <Link href={`/posts/${doc?.slug}`}>{doc?.title || 'Publicación sin título'}</Link>
                      </Fragment>
                    )}
                    {createdAt && ` el ${formatDateTime(createdAt)}`}
                  </p>
                </div>
                {index < comments.length - 1 && <HR />}
              </Fragment>
            )
          })}
        <HR />
        <Button href="/logout" appearance="secondary" label="Cerrar sesión" />
      </Gutter>
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Tu Cuenta',
  description: 'Crea una cuenta o inicia sesión en tu cuenta existente.',
  openGraph: mergeOpenGraph({
    title: 'Cuenta',
    url: '/account',
  }),
}
