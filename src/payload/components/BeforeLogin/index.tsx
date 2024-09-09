import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Bienvenid@ al panel de administradores!</b>
        {' Este es el lugar donde los administradores del sitio iniciarán sesión para administrar tu sitio web. Los usuarios necesitarán '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>iniciar sesión en el sitio en su lugar</a>
        {' para acceder a su cuenta de usuario, historial de comentarios y más.'}
      </p>
    </div>
  )
}

export default BeforeLogin
