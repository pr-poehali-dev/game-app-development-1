import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Choice {
  text: string;
  nextScene: number;
  effect?: string;
}

interface Scene {
  id: number;
  title: string;
  text: string;
  character: string;
  characterEmoji: string;
  choices: Choice[];
  isEnding?: boolean;
}

const questData: Scene[] = [
  {
    id: 0,
    title: "Начало приключения",
    text: "Ты просыпаешься в волшебном лесу. Рядом сидит маленький дракончик по имени Спарк. Он выглядит встревоженным.",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [
      { text: "Поговорить со Спарком", nextScene: 1 },
      { text: "Осмотреться вокруг", nextScene: 2 }
    ]
  },
  {
    id: 1,
    title: "Разговор с драконом",
    text: "Спарк рассказывает, что злой волшебник украл волшебный кристалл леса. Без него все растения начинают увядать!",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [
      { text: "Помочь Спарку вернуть кристалл", nextScene: 3, effect: "heroic" },
      { text: "Спросить, что получишь взамен", nextScene: 4, effect: "practical" }
    ]
  },
  {
    id: 2,
    title: "Исследование леса",
    text: "Ты замечаешь странное свечение за деревьями. Листья на ветках начинают терять свой цвет.",
    character: "Рассказчик",
    characterEmoji: "📖",
    choices: [
      { text: "Пойти к свечению", nextScene: 5 },
      { text: "Вернуться к Спарку", nextScene: 1 }
    ]
  },
  {
    id: 3,
    title: "Путь героя",
    text: "Спарк радостно взлетает! Он говорит, что знает путь к башне волшебника. Вы отправляетесь в путешествие вместе.",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [
      { text: "Идти через тёмную пещеру (быстро)", nextScene: 6 },
      { text: "Идти вдоль реки (безопасно)", nextScene: 7 }
    ]
  },
  {
    id: 4,
    title: "Награда",
    text: "Спарк немного расстроен, но обещает показать тебе секретное сокровище леса после спасения кристалла.",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [
      { text: "Согласиться помочь", nextScene: 3 }
    ]
  },
  {
    id: 5,
    title: "Волшебный портал",
    text: "Свечение оказывается древним порталом. На камне написаны загадочные руны. Появляется мудрая сова.",
    character: "Мудрая Сова",
    characterEmoji: "🦉",
    choices: [
      { text: "Попросить сову о помощи", nextScene: 8 },
      { text: "Попробовать прочитать руны самостоятельно", nextScene: 9 }
    ]
  },
  {
    id: 6,
    title: "Тёмная пещера",
    text: "В пещере вы встречаете дружелюбного светлячка по имени Блик. Он освещает путь и рассказывает о слабости волшебника.",
    character: "Блик",
    characterEmoji: "✨",
    choices: [
      { text: "Узнать о слабости волшебника", nextScene: 10 },
      { text: "Просто пройти дальше", nextScene: 11 }
    ]
  },
  {
    id: 7,
    title: "Путь вдоль реки",
    text: "У реки вы встречаете русалочку Марину. Она предлагает дать вам защитную раковину, которая отразит одно заклинание.",
    character: "Марина",
    characterEmoji: "🧜‍♀️",
    choices: [
      { text: "Принять подарок", nextScene: 12, effect: "protected" },
      { text: "Вежливо отказаться", nextScene: 12 }
    ]
  },
  {
    id: 8,
    title: "Совет совы",
    text: "Сова объясняет, что портал приведёт прямо к башне волшебника, минуя все ловушки. Но использовать его можно только с чистым сердцем.",
    character: "Мудрая Сова",
    characterEmoji: "🦉",
    choices: [
      { text: "Войти в портал", nextScene: 13 },
      { text: "Пойти обычным путём", nextScene: 3 }
    ]
  },
  {
    id: 9,
    title: "Древние руны",
    text: "Руны начинают светиться под твоим прикосновением! Ты получаешь видение о том, где находится кристалл.",
    character: "Рассказчик",
    characterEmoji: "📖",
    choices: [
      { text: "Использовать знание из видения", nextScene: 13 }
    ]
  },
  {
    id: 10,
    title: "Секрет волшебника",
    text: "Блик шепчет: волшебник боится искреннего смеха. Это важная информация!",
    character: "Блик",
    characterEmoji: "✨",
    choices: [
      { text: "Продолжить путь с новым знанием", nextScene: 11, effect: "knows_weakness" }
    ]
  },
  {
    id: 11,
    title: "Выход из пещеры",
    text: "Вы выходите из пещеры и видите башню волшебника вдали. Она выглядит зловеще.",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [
      { text: "Храбро войти в башню", nextScene: 14 }
    ]
  },
  {
    id: 12,
    title: "К башне",
    text: "Спарк благодарит Марину, и вы продолжаете путь. Впереди показывается тёмная башня волшебника.",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [
      { text: "Войти в башню", nextScene: 14 }
    ]
  },
  {
    id: 13,
    title: "Магический портал",
    text: "Портал переносит вас прямо в тронный зал! Волшебник удивлён вашим появлением. Кристалл на его посохе!",
    character: "Тёмный Волшебник",
    characterEmoji: "🧙‍♂️",
    choices: [
      { text: "Попытаться рассмешить волшебника", nextScene: 15, effect: "laugh" },
      { text: "Потребовать вернуть кристалл", nextScene: 16 }
    ]
  },
  {
    id: 14,
    title: "Встреча с волшебником",
    text: "В тронном зале вы видите волшебника. Он держит светящийся кристалл в руке и грозно смотрит на вас.",
    character: "Тёмный Волшебник",
    characterEmoji: "🧙‍♂️",
    choices: [
      { text: "Рассказать смешную историю", nextScene: 15, effect: "laugh" },
      { text: "Вступить в магическую дуэль", nextScene: 17 }
    ]
  },
  {
    id: 15,
    title: "Победа смехом! 🎉",
    text: "Волшебник начинает смеяться! Его злые чары развеиваются, и он превращается в доброго старичка. Оказывается, он был проклят! Кристалл возвращён, лес спасён!",
    character: "Добрый Волшебник",
    characterEmoji: "🧙‍♂️",
    choices: [],
    isEnding: true
  },
  {
    id: 16,
    title: "Храбрая победа! 🎉",
    text: "Твоя храбрость впечатляет волшебника. Он понимает, что не может противостоять такой решимости. Волшебник добровольно отдаёт кристалл и покидает башню. Лес спасён!",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [],
    isEnding: true
  },
  {
    id: 17,
    title: "Эпическая битва! 🎉",
    text: "Спарк помогает тебе в магической дуэли! Вместе вы побеждаете волшебника. Кристалл освобождён, лес снова процветает. Ты стал настоящим героем!",
    character: "Спарк",
    characterEmoji: "🐉",
    choices: [],
    isEnding: true
  }
];

export default function Index() {
  const [currentSceneId, setCurrentSceneId] = useState(0);
  const [visitedScenes, setVisitedScenes] = useState<number[]>([0]);
  const [effects, setEffects] = useState<string[]>([]);

  const currentScene = questData.find(scene => scene.id === currentSceneId) || questData[0];
  const progress = (visitedScenes.length / questData.length) * 100;

  const handleChoice = (choice: Choice) => {
    setCurrentSceneId(choice.nextScene);
    setVisitedScenes(prev => [...prev, choice.nextScene]);
    if (choice.effect) {
      setEffects(prev => [...prev, choice.effect]);
    }
  };

  const restartQuest = () => {
    setCurrentSceneId(0);
    setVisitedScenes([0]);
    setEffects([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-2">
            Волшебный квест 🌟
          </h1>
          <p className="text-lg text-gray-600">Приключение в заколдованном лесу</p>
        </div>

        <div className="mb-6 animate-scale-in">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Map" className="text-purple-500" size={20} />
            <span className="text-sm font-medium text-gray-700">Прогресс путешествия</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/50" />
          <p className="text-xs text-gray-500 mt-1">
            Посещено сцен: {visitedScenes.length} из {questData.length}
          </p>
        </div>

        <Card className="mb-6 overflow-hidden shadow-2xl animate-enter">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{currentScene.characterEmoji}</div>
              <div>
                <p className="text-sm opacity-90">Говорит</p>
                <h2 className="text-2xl font-bold">
                  {currentScene.character}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/80 backdrop-blur">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">
              {currentScene.title}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {currentScene.text}
            </p>

            {!currentScene.isEnding ? (
              <div className="space-y-3">
                {currentScene.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full h-auto p-4 text-left text-base hover-scale bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Icon name="ChevronRight" size={20} />
                      <span>{choice.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center space-y-4 animate-scale-in">
                <div className="text-6xl mb-4">🎊</div>
                <p className="text-xl font-bold text-purple-600 mb-4">Конец истории!</p>
                <Button
                  onClick={restartQuest}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg hover-scale"
                >
                  <Icon name="RotateCcw" className="mr-2" size={20} />
                  Начать новое приключение
                </Button>
              </div>
            )}
          </div>
        </Card>

        {effects.length > 0 && (
          <Card className="p-6 bg-white/60 backdrop-blur animate-fade-in">
            <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
              <Icon name="Award" size={20} />
              Достижения
            </h4>
            <div className="flex flex-wrap gap-2">
              {effects.includes('heroic') && (
                <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
                  ⭐ Героическая душа
                </span>
              )}
              {effects.includes('knows_weakness') && (
                <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
                  🧠 Знание секрета
                </span>
              )}
              {effects.includes('protected') && (
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                  🛡️ Магическая защита
                </span>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
