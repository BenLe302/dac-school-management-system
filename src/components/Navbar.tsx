import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* BARRE DE RECHERCHE */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="Rechercher" width={14} height={14} />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICÔNES ET UTILISATEUR */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" title="Messages">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-gray-50 transition-colors" title="Annonces">
          <Image src="/announcement.png" alt="Annonces" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            3
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Jean Dupont</span>
          <span className="text-[10px] text-gray-500 text-right">Administrateur</span>
        </div>
        <Image
          src="/avatar.png"
          alt="Avatar utilisateur"
          width={36}
          height={36}
          className="rounded-full cursor-pointer hover:ring-2 hover:ring-dacSky transition-all"
        />
      </div>
    </div>
  );
};

export default Navbar;