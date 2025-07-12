import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center'>
        <div className='mb-6'>
          <Image 
            src="/logo.png" 
            alt="Dac School Logo" 
            width={80} 
            height={80} 
            className='mx-auto mb-4'
          />
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Dac School</h1>
          <p className='text-gray-600'>Système de Gestion Scolaire</p>
        </div>
        
        <div className='space-y-4'>
          <Link 
             href="/admin" 
             className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200'
           >
             Accéder au Dashboard
           </Link>
          
          <Link 
            href="/sign-in" 
            className='block w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200'
          >
            Se Connecter
          </Link>
        </div>
        
        <div className='mt-6 text-sm text-gray-500'>
          <p>Gérez votre école efficacement</p>
        </div>
      </div>
    </div>
  )
}

export default Homepage