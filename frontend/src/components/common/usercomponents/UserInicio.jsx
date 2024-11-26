export function UserInicio() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bienvenido al panel de usuario
        </h1>
        <p className="text-gray-600">
          Aquí podrás gestionar tu perfil, ver tus actividades recientes y
          ajustar la configuración de tu cuenta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Consejos Útiles
          </h2>
          <p className="text-gray-600 mb-4">
            Aquí tienes algunos consejos para mejorar tu experiencia y seguridad
            en la plataforma.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Actualiza tu contraseña regularmente para mantener la seguridad de
              tu cuenta.
            </li>
            <li>
              Revisa tus configuraciones de privacidad para asegurarte de que
              están ajustadas a tus necesidades.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recursos Adicionales
          </h2>
          <p className="text-gray-600 mb-4">
            Aprovecha estos recursos para obtener más información y asistencia.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <a href="/faq" className="text-blue-500 hover:underline">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="/support" className="text-blue-500 hover:underline">
                Soporte técnico
              </a>
            </li>
            <li>
              <a href="/contact" className="text-blue-500 hover:underline">
                Contacto con el equipo
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Tener en cuenta
        </h2>
        <p className="text-gray-600 mb-4">
          Recomendaciones y recordatorios importantes para mantener tu cuenta
          segura y actualizada.
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            Habilita la autenticación de dos factores para mayor seguridad.
          </li>
          <li>Revisa y actualiza tu información de contacto.</li>
          <li>
            Completa el perfil para obtener acceso completo a todas las
            funciones.
          </li>
        </ul>
      </div>
    </div>
  );
}
