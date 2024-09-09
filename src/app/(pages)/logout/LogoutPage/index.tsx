'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import type { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { postsPage, projectsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Cerró sesión correctamente.')
      } catch (_) {
        setError('Ya has cerrado sesión.')
      }
    }

    performLogout()
  }, [logout])

  const hasPostsPage = typeof postsPage === 'object' && postsPage?.slug
  const hasProjectsPage = typeof projectsPage === 'object' && projectsPage?.slug

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'¿Qué te gustaría hacer a continuación? '}
            {hasPostsPage && hasProjectsPage && <Fragment>{'Navegar por '}</Fragment>}
            {hasPostsPage && (
              <Fragment>
                <Link href={`/${postsPage.slug}`}>todos los posts</Link>
              </Fragment>
            )}
            {hasPostsPage && hasProjectsPage && <Fragment>{' o '}</Fragment>}
            {hasProjectsPage && (
              <Fragment>
                <Link href={`/${projectsPage.slug}`}>todos los proyectos</Link>
              </Fragment>
            )}
            {` Para iniciar sesión nuevamente, `}
            <Link href="/login">haz clic aquí</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
