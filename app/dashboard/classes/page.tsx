'use client'

import { useState } from 'react';
import { Plus, Calendar, Users, Clock, Euro } from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockClasses = [
  {
    id: 1,
    name: 'Yoga Flow',
    instructor: 'Anna Berg',
    time: 'Mo, Mi, Fr - 09:00',
    category: 'Yoga & Meditation',
    difficulty: 'Anfänger',
    duration: '60 Min',
    price: 15,
    booked: 12,
    capacity: 15,
    description: 'Sanfte Yoga-Flows für Anfänger und Fortgeschrittene'
  },
  {
    id: 2,
    name: 'HIIT Training',
    instructor: 'Mike Fischer',
    time: 'Di, Do - 18:00',
    category: 'Cardio & HIIT',
    difficulty: 'Fortgeschritten',
    duration: '45 Min',
    price: 20,
    booked: 20,
    capacity: 20,
    description: 'Hochintensives Intervalltraining für maximale Fettverbrennung'
  },
  {
    id: 3,
    name: 'Pilates',
    instructor: 'Julia Roth',
    time: 'Mo, Mi - 17:00',
    category: 'Pilates & Stretching',
    difficulty: 'Mittel',
    duration: '60 Min',
    price: 18,
    booked: 8,
    capacity: 12,
    description: 'Core-Training und Körperhaltung verbessern'
  },
  {
    id: 4,
    name: 'Spinning',
    instructor: 'Tom Weber',
    time: 'Di, Do, Sa - 07:00',
    category: 'Cardio & HIIT',
    difficulty: 'Mittel',
    duration: '45 Min',
    price: 18,
    booked: 15,
    capacity: 18,
    description: 'Indoor-Cycling für Ausdauer und Kraft'
  },
  {
    id: 5,
    name: 'Boxing Fitness',
    instructor: 'Sarah Klein',
    time: 'Mo, Mi, Fr - 19:00',
    category: 'Kampfsport',
    difficulty: 'Fortgeschritten',
    duration: '60 Min',
    price: 22,
    booked: 10,
    capacity: 15,
    description: 'Boxtraining für Fitness und Selbstverteidigung'
  },
  {
    id: 6,
    name: 'Krafttraining',
    instructor: 'Max Bauer',
    time: 'Di, Do - 20:00',
    category: 'Krafttraining',
    difficulty: 'Experte',
    duration: '75 Min',
    price: 25,
    booked: 8,
    capacity: 10,
    description: 'Gezielter Muskelaufbau mit freien Gewichten'
  },
  {
    id: 7,
    name: 'Zumba',
    instructor: 'Lisa Martinez',
    time: 'Mi, Fr - 18:30',
    category: 'Tanz & Bewegung',
    difficulty: 'Anfänger',
    duration: '60 Min',
    price: 16,
    booked: 18,
    capacity: 25,
    description: 'Lateinamerikanische Tanzfitness voller Energie'
  },
  {
    id: 8,
    name: 'Functional Training',
    instructor: 'Chris Wagner',
    time: 'Mo, Do - 06:30',
    category: 'Functional Training',
    difficulty: 'Mittel',
    duration: '60 Min',
    price: 20,
    booked: 7,
    capacity: 12,
    description: 'Alltagsorientiertes Training für mehr Beweglichkeit'
  },
  {
    id: 9,
    name: 'Stretching & Mobility',
    instructor: 'Emma Richter',
    time: 'Di, Sa - 10:00',
    category: 'Pilates & Stretching',
    difficulty: 'Anfänger',
    duration: '45 Min',
    price: 12,
    booked: 6,
    capacity: 15,
    description: 'Verbesserung der Flexibilität und Regeneration'
  }
];

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleBookClass = (classItem: any) => {
    console.log(`Booking class: ${classItem.name}`);
  };

  const handleCreateClass = () => {
    console.log('Creating new class...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Kursverwaltung</h2>
            <p className="text-slate-300">Verwalten Sie alle Ihre Fitnesskurse</p>
          </div>
          <button
            onClick={handleCreateClass}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Neuer Kurs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-slate-800/70 rounded-xl p-6 hover:shadow-xl hover:bg-slate-700/70 transition-all border border-slate-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{classItem.name}</h3>
                  <p className="text-slate-300">{classItem.instructor}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  classItem.difficulty === 'Anfänger' ? 'bg-green-900/50 text-green-300' :
                  classItem.difficulty === 'Mittel' ? 'bg-yellow-900/50 text-yellow-300' :
                  classItem.difficulty === 'Fortgeschritten' ? 'bg-orange-900/50 text-orange-300' :
                  'bg-red-900/50 text-red-300'
                }`}>
                  {classItem.difficulty}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {classItem.time}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {classItem.category} • {classItem.duration}
                </p>
                <p className="flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  €{classItem.price}
                </p>
              </div>

              <p className="text-slate-400 text-sm mb-4">{classItem.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-slate-300">
                  <span>Buchungen</span>
                  <span>{classItem.booked}/{classItem.capacity}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      (classItem.booked / classItem.capacity) > 0.8 ? 'bg-red-500' :
                      (classItem.booked / classItem.capacity) > 0.6 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{width: `${(classItem.booked / classItem.capacity) * 100}%`}}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setSelectedClass(classItem)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => handleBookClass(classItem)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    classItem.booked >= classItem.capacity
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  disabled={classItem.booked >= classItem.capacity}
                >
                  {classItem.booked >= classItem.capacity ? 'Ausgebucht' : 'Buchen'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedClass.name}</h3>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm">Trainer</p>
                    <p className="text-white font-semibold">{selectedClass.instructor}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Schwierigkeit</p>
                    <p className="text-white font-semibold">{selectedClass.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Zeit</p>
                    <p className="text-white font-semibold">{selectedClass.time}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Dauer</p>
                    <p className="text-white font-semibold">{selectedClass.duration}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Kategorie</p>
                    <p className="text-white font-semibold">{selectedClass.category}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Preis</p>
                    <p className="text-white font-semibold">€{selectedClass.price}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Beschreibung</p>
                  <p className="text-white">{selectedClass.description}</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl">
                <p className="text-slate-400 text-sm mb-2">Auslastung</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          (selectedClass.booked / selectedClass.capacity) > 0.8 ? 'bg-red-500' :
                          (selectedClass.booked / selectedClass.capacity) > 0.6 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{width: `${(selectedClass.booked / selectedClass.capacity) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <span className="text-white font-bold">
                    {selectedClass.booked}/{selectedClass.capacity}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedClass(null)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  Schließen
                </button>
                <button
                  onClick={() => handleBookClass(selectedClass)}
                  className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                    selectedClass.booked >= selectedClass.capacity
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  disabled={selectedClass.booked >= selectedClass.capacity}
                >
                  {selectedClass.booked >= selectedClass.capacity ? 'Ausgebucht' : 'Jetzt Buchen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
