import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  // Traduction des types d'utilisateurs
  const getTypeInFrench = (type: string) => {
    switch (type.toLowerCase()) {
      case 'student': return 'Élèves';
      case 'teacher': return 'Professeurs';
      case 'parent': return 'Parents';
      case 'staff': return 'Personnel';
      default: return type;
    }
  };

  // Données simulées pour chaque type
  const getCount = (type: string) => {
    switch (type.toLowerCase()) {
      case 'student': return '1,234';
      case 'teacher': return '87';
      case 'parent': return '956';
      case 'staff': return '45';
      default: return '0';
    }
  };

  return (
    <div className="rounded-2xl odd:bg-dacPurple even:bg-dacYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="Plus d'options" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{getCount(type)}</h1>
      <h2 className="text-sm font-medium text-gray-500">{getTypeInFrench(type)}</h2>
    </div>
  );
};

export default UserCard;