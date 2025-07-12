"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type EventType = 'exam' | 'meeting' | 'trip' | 'event' | 'holiday' | 'sport';

interface Event {
  id: number;
  title: string;
  time: string;
  description: string;
  type: EventType;
  date: Date;
  priority: 'low' | 'medium' | 'high';
  location?: string;
}

// Événements scolaires enrichis
const events: Event[] = [
  {
    id: 1,
    title: "Réunion Parents-Professeurs",
    time: "14:00 - 16:00",
    description: "Rencontre trimestrielle pour discuter des progrès des élèves et planifier le trimestre suivant.",
    type: "meeting",
    date: new Date(2024, 11, 15),
    priority: "high",
    location: "Salle polyvalente"
  },
  {
    id: 2,
    title: "Examen de Mathématiques",
    time: "08:00 - 10:00",
    description: "Évaluation trimestrielle pour les classes de 3ème - Algèbre et géométrie.",
    type: "exam",
    date: new Date(2024, 11, 18),
    priority: "high",
    location: "Salles 201-205"
  },
  {
    id: 3,
    title: "Sortie Éducative - Musée",
    time: "09:00 - 17:00",
    description: "Visite du Musée d'Histoire Naturelle avec les classes de 5ème. Départ en bus à 8h30.",
    type: "trip",
    date: new Date(2024, 11, 20),
    priority: "medium",
    location: "Musée d'Histoire Naturelle"
  },
  {
    id: 4,
    title: "Conseil de Classe",
    time: "16:00 - 18:00",
    description: "Conseil de classe du premier trimestre pour toutes les sections. Bilan et orientations.",
    type: "meeting",
    date: new Date(2024, 11, 22),
    priority: "high",
    location: "Salle des professeurs"
  },
  {
    id: 5,
    title: "Spectacle de Noël",
    time: "19:00 - 21:00",
    description: "Représentation théâtrale préparée par les élèves de l'école. Entrée libre pour les familles.",
    type: "event",
    date: new Date(2024, 11, 19),
    priority: "medium",
    location: "Amphithéâtre"
  },
  {
    id: 6,
    title: "Vacances de Noël",
    time: "Toute la journée",
    description: "Début des vacances scolaires de Noël. Reprise des cours le 6 janvier.",
    type: "holiday",
    date: new Date(2024, 11, 21),
    priority: "low",
    location: "École fermée"
  },
  {
    id: 7,
    title: "Tournoi de Football",
    time: "14:00 - 17:00",
    description: "Tournoi inter-classes de football. Inscription obligatoire auprès du professeur de sport.",
    type: "sport",
    date: new Date(2024, 11, 16),
    priority: "medium",
    location: "Terrain de sport"
  },
  {
    id: 8,
    title: "Formation Premiers Secours",
    time: "10:00 - 12:00",
    description: "Formation aux gestes de premiers secours pour les élèves de terminale.",
    type: "meeting",
    date: new Date(2024, 11, 17),
    priority: "medium",
    location: "Infirmerie"
  }
];

// Fonction pour obtenir les événements du jour sélectionné
const getEventsForDate = (date: Date) => {
  return events.filter(event => 
    event.date.toDateString() === date.toDateString()
  );
};

// Fonction pour vérifier si une date a des événements
const hasEvents = (date: Date) => {
  return events.some(event => 
    event.date.toDateString() === date.toDateString()
  );
};

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'agenda'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const selectedDate = Array.isArray(value) ? value[0] : value;
  
  // Filtrage des événements
  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'all') return events;
    return events.filter(event => event.type === selectedFilter);
  }, [selectedFilter]);
  
  const eventsForSelectedDate = selectedDate ? 
    filteredEvents.filter(event => event.date.toDateString() === selectedDate.toDateString()) : [];
  
  // Événements du mois actuel pour la vue agenda
  const monthEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const eventMonth = event.date.getMonth();
      const eventYear = event.date.getFullYear();
      return eventMonth === currentMonth.getMonth() && eventYear === currentMonth.getFullYear();
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [filteredEvents, currentMonth]);

  // Configuration pour la localisation française avec indicateurs améliorés
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = filteredEvents.filter(event => 
        event.date.toDateString() === date.toDateString()
      );
      
      if (dayEvents.length > 0) {
        const highPriorityCount = dayEvents.filter(e => e.priority === 'high').length;
        const hasHighPriority = highPriorityCount > 0;
        
        return (
          <div className="flex flex-col items-center w-full">
            <div className="event-indicators">
              {dayEvents.slice(0, 4).map((event, index) => (
                <div
                  key={index}
                  className={`event-dot ${
                    event.type === 'exam' ? 'bg-red-500' :
                    event.type === 'meeting' ? 'bg-blue-500' :
                    event.type === 'trip' ? 'bg-green-500' :
                    event.type === 'holiday' ? 'bg-purple-500' :
                    event.type === 'sport' ? 'bg-orange-500' :
                    'bg-indigo-500'
                  }`}
                  title={event.title}
                />
              ))}
            </div>
            {dayEvents.length > 4 && (
              <div className="event-count">
                {dayEvents.length}
              </div>
            )}
            {hasHighPriority && (
              <div className="w-1 h-1 bg-red-600 rounded-full mt-1 animate-pulse" />
            )}
          </div>
        );
      }
    }
    return null;
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case 'exam': return 'border-t-red-500 bg-red-50';
      case 'meeting': return 'border-t-blue-500 bg-blue-50';
      case 'trip': return 'border-t-green-500 bg-green-50';
      case 'event': return 'border-t-purple-500 bg-purple-50';
      case 'holiday': return 'border-t-orange-500 bg-orange-50';
      case 'sport': return 'border-t-yellow-500 bg-yellow-50';
      default: return 'border-t-gray-400 bg-gray-50';
    }
  };

  const getEventTypeIcon = (type: EventType) => {
    switch (type) {
      case 'exam': return '📝';
      case 'meeting': return '👥';
      case 'trip': return '🚌';
      case 'event': return '🎭';
      case 'holiday': return '🏖️';
      case 'sport': return '⚽';
      default: return '📅';
    }
  };

  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getEventTypeLabel = (type: EventType) => {
    switch (type) {
      case 'exam': return 'Examens';
      case 'meeting': return 'Réunions';
      case 'trip': return 'Sorties';
      case 'event': return 'Événements';
      case 'holiday': return 'Vacances';
      case 'sport': return 'Sport';
      default: return 'Autre';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* En-tête avec contrôles */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-800">📅 Calendrier Scolaire</h1>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {monthEvents.length} événement{monthEvents.length > 1 ? 's' : ''} ce mois
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'calendar' ? 'agenda' : 'calendar')}
            className="px-3 py-1 text-sm bg-dacSky text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {viewMode === 'calendar' ? '📋 Vue Agenda' : '📅 Vue Calendrier'}
          </button>
          <Image src="/moreDark.png" alt="Plus d'options" width={20} height={20} className="cursor-pointer" />
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedFilter === 'all' 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            Tous ({events.length})
          </button>
          {(['exam', 'meeting', 'trip', 'event', 'holiday', 'sport'] as EventType[]).map(type => {
            const count = events.filter(e => e.type === type).length;
            if (count === 0) return null;
            return (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors flex items-center gap-1 ${
                  selectedFilter === type 
                    ? 'bg-gray-800 text-white border-gray-800' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                <span>{getEventTypeIcon(type)}</span>
                {getEventTypeLabel(type)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <>
          {/* Vue Calendrier */}
          <div className="mb-4">
            <Calendar 
              onChange={onChange} 
              value={value}
              tileContent={tileContent}
              locale="fr-FR"
              className="w-full border-none custom-calendar"
              onActiveStartDateChange={({ activeStartDate }) => {
                if (activeStartDate) setCurrentMonth(activeStartDate);
              }}
            />
          </div>
          
          {/* Événements du jour sélectionné */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span>🗓️</span>
              Événements {selectedDate && `- ${selectedDate.toLocaleDateString('fr-FR', { 
                weekday: 'long',
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}`}
            </h2>
            <div className="space-y-3">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event) => (
                  <div
                    className={`p-4 rounded-lg border-2 border-l-4 ${getEventTypeColor(event.type)} hover:shadow-md transition-all duration-200 cursor-pointer fade-in`}
                    key={event.id}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-xl">{getEventTypeIcon(event.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{event.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityBadge(event.priority)}`}>
                              {event.priority === 'high' ? 'Urgent' : event.priority === 'medium' ? 'Important' : 'Normal'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                          {event.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <span>📍</span>
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded border">
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <span className="text-3xl mb-2 block">🗓️</span>
                  <p className="text-lg font-medium">Aucun événement prévu</p>
                  <p className="text-sm">Profitez de cette journée libre !</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Vue Agenda */
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span>📋</span>
            Agenda - {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {monthEvents.length > 0 ? (
              monthEvents.map((event) => (
                 <div
                   key={event.id}
                   className={`p-3 rounded-lg border-l-4 ${getEventTypeColor(event.type)} hover:shadow-md transition-all duration-200 fade-in`}
                 >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>📅 {event.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                          <span>🕐 {event.time}</span>
                          {event.location && <span>📍 {event.location}</span>}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityBadge(event.priority)}`}>
                      {event.priority === 'high' ? 'Urgent' : event.priority === 'medium' ? 'Important' : 'Normal'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <span className="text-3xl mb-2 block">📋</span>
                <p>Aucun événement ce mois-ci</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Légende améliorée */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">🏷️ Légende des événements</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {(['exam', 'meeting', 'trip', 'event', 'holiday', 'sport'] as EventType[]).map(type => (
            <div key={type} className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <span className="text-base">{getEventTypeIcon(type)}</span>
              <span className="font-medium">{getEventTypeLabel(type)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;