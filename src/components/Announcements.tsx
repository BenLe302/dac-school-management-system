const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "Vacances de Noël",
      date: "15 Déc 2024",
      content: "Les vacances de Noël commenceront le 20 décembre 2024. Reprise des cours le 8 janvier 2025. Bonnes fêtes à tous !",
      bgColor: "bg-dacSkyLight",
      priority: "info"
    },
    {
      id: 2,
      title: "Réunion Parents-Professeurs",
      date: "18 Déc 2024",
      content: "Réunion trimestrielle obligatoire pour tous les parents. Rendez-vous individuels de 14h à 17h en salle polyvalente.",
      bgColor: "bg-dacPurpleLight",
      priority: "important"
    },
    {
      id: 3,
      title: "Nouvelle Cantine Bio",
      date: "10 Déc 2024",
      content: "À partir de janvier 2025, notre cantine proposera exclusivement des repas bio et locaux. Tarifs inchangés.",
      bgColor: "bg-dacYellowLight",
      priority: "news"
    }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'important': return '🔴';
      case 'info': return 'ℹ️';
      case 'news': return '📢';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Annonces</h1>
        <span className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">Voir tout</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className={`${announcement.bgColor} rounded-md p-4 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{getPriorityIcon(announcement.priority)}</span>
                <h2 className="font-medium text-gray-800">{announcement.title}</h2>
              </div>
              <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1 font-medium">
                {announcement.date}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {announcement.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;