import { SearchForm } from './SearchForm.tsx'

export function App() {
  return (
    <main className='min-h-screen flex flex-col px-4 py-8 md:p-8'>
      <header className='mb-8'>
        <h1 className='text-white font-minecraft-title uppercase text-3xl md:text-5xl text-center'>Usuarios de Minecraft</h1>
        <p className='text-gray-200 text-center mt-2'>Visualizador de perfiles, skins y capas de jugadores de Minecraft</p>
      </header>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-[#1E1E1E]/50 border border-gray-800 rounded-lg p-4 mb-8 hidden md:block'>
          <h2 className='text-xl font-minecraft text-white mb-4'>Características</h2>
          <ul className='text-gray-300 space-y-2 list-disc pl-5'>
            <li>Peticiones desde el servidor a Mojang API https://api.mojang.com/users/profiles/minecraft/username</li>
            <li>Renderizado de imagenes 3D utilizando Lunar Eclipse API https://docs.lunareclipse.studio/</li>
            <li>Visualización de avatar https://crafatar.com/avatars/$ID?size=100&overlay</li>
            <li>Peticiones al servidor propio https://mojang-api-pi.vercel.app/</li>
          </ul>
        </div>
        <SearchForm />
      </div>
      <footer className='mt-auto pt-8 text-gray-500 text-center text-sm'>
        <p>Datos obtenidos de la API de Mojang</p>
        <p className='mt-1'>Visualizador 3D creado con Lunar Eclipse API</p>
      </footer>
    </main>
  )
}