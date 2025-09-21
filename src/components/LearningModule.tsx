import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Award, AlertTriangle, Heart, Shield } from 'lucide-react';
import Quiz from './Quiz';

interface LearningModuleProps {
  disaster: string;
  onComplete: (disaster: string, score: number) => void;
  onBack: () => void;
}

const moduleContent = {
  earthquake: {
    title: 'Earthquake Safety',
    icon: '🌍',
    color: 'from-orange-400 to-red-500',
    image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: [
      {
        title: 'Before an Earthquake',
        content: 'Prepare an emergency kit with water, food, flashlight, and first aid supplies. Secure heavy objects and practice drop drills.',
        tips: ['Create a family emergency plan', 'Identify safe spots in each room', 'Keep emergency supplies ready']
      },
      {
        title: 'During an Earthquake',
        content: 'DROP to hands and knees, take COVER under a desk or table, and HOLD ON until shaking stops.',
        tips: ['Stay away from windows', 'Do not run outside during shaking', 'Protect your head and neck']
      },
      {
        title: 'After an Earthquake',
        content: 'Check for injuries and hazards. Be prepared for aftershocks. Listen to emergency broadcasts.',
        tips: ['Check for gas leaks', 'Wear shoes to protect feet', 'Only use phones for emergencies']
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What should you do during an earthquake?',
        options: ['Run outside immediately', 'Stand in a doorway', 'Drop, Cover, and Hold On', 'Hide under a bed'],
        correctAnswer: 2,
        explanation: 'Drop, Cover, and Hold On is the recommended safety action during earthquakes. Drop to hands and knees, take cover under a sturdy desk or table, and hold on until shaking stops.'
      },
      {
        id: 2,
        question: 'What should be in an earthquake emergency kit?',
        options: ['Only water', 'Water, food, flashlight, and first aid supplies', 'Just a radio', 'Only batteries'],
        correctAnswer: 1,
        explanation: 'An earthquake emergency kit should include water (1 gallon per person per day), non-perishable food, flashlight, first aid supplies, battery-powered radio, and extra batteries.'
      },
      {
        id: 3,
        question: 'After an earthquake, what should you check for first?',
        options: ['Broken dishes', 'Gas leaks and injuries', 'Internet connection', 'TV channels'],
        correctAnswer: 1,
        explanation: 'After an earthquake, immediately check for injuries and gas leaks. Gas leaks can cause fires or explosions, making this a critical safety priority.'
      }
    ]
  },
  fire: {
    title: 'Fire Safety',
    icon: '🔥',
    color: 'from-red-400 to-orange-600',
    image: 'https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: [
      {
        title: 'Fire Prevention',
        content: 'Keep matches and lighters away from children. Install smoke detectors and check batteries regularly.',
        tips: ['Never leave cooking unattended', 'Keep escape routes clear', 'Practice fire drills']
      },
      {
        title: 'If There\'s a Fire',
        content: 'Get out fast and stay out. Crawl low under smoke. Test doors before opening.',
        tips: ['Stop, drop, and roll if clothes catch fire', 'Meet at your meeting place', 'Call 911 from outside']
      },
      {
        title: 'Smoke Safety',
        content: 'Smoke is dangerous. Stay low and get out quickly. If trapped, seal cracks and call for help.',
        tips: ['Smoke rises, so stay low', 'Cover nose and mouth', 'Signal for help at windows']
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'If you smell smoke, what should you do first?',
        options: ['Open all windows', 'Get out immediately and call 911', 'Look for the source', 'Take a shower'],
        correctAnswer: 1,
        explanation: 'If you smell smoke, get out immediately and call 911 from a safe location. Don\'t waste time looking for the source as fires spread very quickly.'
      },
      {
        id: 2,
        question: 'When escaping a fire, how should you move through smoke?',
        options: ['Walk normally', 'Crawl low on hands and knees', 'Run as fast as possible', 'Jump over the smoke'],
        correctAnswer: 1,
        explanation: 'Crawl low on hands and knees because smoke and hot air rise. Cleaner, cooler air is closer to the floor, making it safer to breathe.'
      },
      {
        id: 3,
        question: 'How often should you test smoke detector batteries?',
        options: ['Once a year', 'Every 6 months', 'Every month', 'Never'],
        correctAnswer: 2,
        explanation: 'Test smoke detector batteries monthly and change them at least once a year. Working smoke detectors save lives by providing early warning.'
      }
    ]
  },
  flood: {
    title: 'Flood Safety',
    icon: '🌊',
    color: 'from-blue-400 to-cyan-500',
    image: 'https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: [
      {
        title: 'Before a Flood',
        content: 'Know your evacuation routes. Keep emergency supplies in a waterproof container.',
        tips: ['Monitor weather alerts', 'Move valuable items to higher ground', 'Have a battery-powered radio']
      },
      {
        title: 'During a Flood',
        content: 'Move to higher ground immediately. Never walk or drive through flood water.',
        tips: ['Turn around, don\'t drown', 'Avoid electrical equipment if wet', 'Stay away from moving water']
      },
      {
        title: 'After a Flood',
        content: 'Stay away until officials say it\'s safe. Be careful of contaminated water and damaged buildings.',
        tips: ['Boil water before drinking', 'Throw away contaminated food', 'Take pictures for insurance']
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'How much water can sweep away a car?',
        options: ['3 feet', '2 feet', '1 foot', '6 inches'],
        correctAnswer: 3,
        explanation: 'Just 6 inches of moving water can knock you down, and 12 inches can carry away a vehicle. Turn around, don\'t drown!'
      },
      {
        id: 2,
        question: 'After a flood, what should you do with food that touched flood water?',
        options: ['Wash it thoroughly', 'Cook it well', 'Throw it away', 'Dry it first'],
        correctAnswer: 2,
        explanation: 'Throw away all food that came in contact with flood water. Flood water contains contaminants that cannot be removed by washing or cooking.'
      },
      {
        id: 3,
        question: 'During a flood warning, what should you do first?',
        options: ['Take photos', 'Move to higher ground', 'Gather belongings', 'Call friends'],
        correctAnswer: 1,
        explanation: 'Move to higher ground immediately when there\'s a flood warning. Your safety is more important than belongings, which can be replaced.'
      }
    ]
  },
  tornado: {
    title: 'Tornado Safety',
    icon: '🌪️',
    color: 'from-gray-400 to-blue-600',
    image: 'https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: [
      {
        title: 'Tornado Watch vs Warning',
        content: 'A WATCH means conditions are right for tornadoes. A WARNING means a tornado has been spotted.',
        tips: ['Listen to weather radio', 'Know the difference', 'Take warnings seriously']
      },
      {
        title: 'Finding Shelter',
        content: 'Go to the lowest floor, away from windows. Get under a sturdy table and protect your head.',
        tips: ['Stay in interior rooms', 'Avoid large roof areas', 'Mobile homes are not safe']
      },
      {
        title: 'After a Tornado',
        content: 'Watch for debris and damaged power lines. Check for injuries and give first aid.',
        tips: ['Be careful of broken glass', 'Stay away from power lines', 'Help injured people']
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Where is the safest place during a tornado?',
        options: ['Basement or lowest floor interior room', 'Top floor', 'Near large windows', 'In a car'],
        correctAnswer: 0,
        explanation: 'The safest place is in a basement or lowest floor interior room, away from windows. Get under a sturdy table and protect your head and neck.'
      },
      {
        id: 2,
        question: 'What\'s the difference between a tornado watch and warning?',
        options: ['No difference', 'Watch means tornado spotted, warning means conditions are right', 'Warning means tornado spotted, watch means conditions are right', 'Both mean the same thing'],
        correctAnswer: 2,
        explanation: 'A tornado WARNING means a tornado has been spotted or detected on radar. A tornado WATCH means conditions are favorable for tornado development.'
      },
      {
        id: 3,
        question: 'If you\'re in a mobile home during a tornado warning, what should you do?',
        options: ['Stay inside', 'Go to a sturdy building or storm shelter', 'Open windows', 'Go outside'],
        correctAnswer: 1,
        explanation: 'Mobile homes are not safe during tornadoes. Go to a sturdy building or storm shelter immediately when a tornado warning is issued.'
      }
    ]
  },
  hurricane: {
    title: 'Hurricane Safety',
    icon: '🌀',
    color: 'from-teal-400 to-blue-600',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: [
      {
        title: 'Hurricane Preparation',
        content: 'Stock up on supplies early. Board up windows and secure outdoor items.',
        tips: ['Fill bathtubs with water', 'Charge all devices', 'Know evacuation routes']
      },
      {
        title: 'During the Storm',
        content: 'Stay indoors away from windows. Don\'t go outside during the eye of the storm.',
        tips: ['Listen to emergency radio', 'Stay away from flooded areas', 'Be patient - storms last hours']
      },
      {
        title: 'After the Hurricane',
        content: 'Wait for officials to say it\'s safe. Be careful of flooding and debris.',
        tips: ['Avoid flood water', 'Report power outages', 'Help your neighbors']
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'During the eye of a hurricane, what should you do?',
        options: ['Go outside to assess damage', 'Stay inside - the storm isn\'t over', 'Remove window boards', 'Go on the roof'],
        correctAnswer: 1,
        explanation: 'Stay inside during the eye of the hurricane. The eye is just the calm center - the storm will resume with potentially stronger winds from the opposite direction.'
      },
      {
        id: 2,
        question: 'How much water should you store per person for a hurricane?',
        options: ['1 gallon per day', '2 gallons per day', '5 gallons total', '1 gallon total'],
        correctAnswer: 0,
        explanation: 'Store at least 1 gallon of water per person per day for at least 3 days. This covers drinking, cooking, and basic hygiene needs.'
      },
      {
        id: 3,
        question: 'When should you evacuate for a hurricane?',
        options: ['Never', 'Only when it arrives', 'When officials tell you to', 'After the storm passes'],
        correctAnswer: 2,
        explanation: 'Evacuate when local officials tell you to. They have the best information about storm surge, flooding, and other hazards in your specific area.'
      }
    ]
  },
  firstaid: {
    title: 'First Aid Basics',
    icon: '🏥',
    color: 'from-green-400 to-emerald-600',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    steps: [
      {
        title: 'Basic First Aid Kit',
        content: 'Every home should have bandages, antiseptic, pain relievers, and emergency numbers.',
        tips: ['Keep kit easily accessible', 'Check expiration dates', 'Know what each item is for']
      },
      {
        title: 'Treating Minor Cuts',
        content: 'Clean the wound, apply pressure to stop bleeding, and cover with a clean bandage.',
        tips: ['Wash hands first', 'Apply gentle pressure', 'Change bandages daily']
      },
      {
        title: 'When to Call 911',
        content: 'Call for serious injuries, difficulty breathing, chest pain, or unconsciousness.',
        tips: ['Stay calm when calling', 'Know your address', 'Follow dispatcher instructions']
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What should you do first when treating a cut?',
        options: ['Apply a bandage', 'Wash your hands', 'Give pain medication', 'Call 911'],
        correctAnswer: 1,
        explanation: 'Always wash your hands first to prevent infection. Clean hands are essential before treating any wound to avoid introducing bacteria.'
      },
      {
        id: 2,
        question: 'When should you call 911?',
        options: ['For minor cuts', 'For serious injuries or difficulty breathing', 'For small bruises', 'For headaches'],
        correctAnswer: 1,
        explanation: 'Call 911 for serious injuries, difficulty breathing, chest pain, unconsciousness, severe bleeding, or any life-threatening emergency.'
      },
      {
        id: 3,
        question: 'How often should you check your first aid kit?',
        options: ['Never', 'Every few years', 'Every 6 months', 'Only when you use it'],
        correctAnswer: 2,
        explanation: 'Check your first aid kit every 6 months to replace expired medications, restock used items, and ensure everything is in good condition.'
      }
    ]
  }
};

const LearningModule: React.FC<LearningModuleProps> = ({ disaster, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const module = moduleContent[disaster as keyof typeof moduleContent];
  
  if (!module) {
    return <div>Module not found</div>;
  }

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < module.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (completedSteps.length === module.steps.length - 1) {
      // All steps completed, show quiz
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number) => {
    onComplete(disaster, score);
  };

  const handleQuizRetry = () => {
    // Reset quiz state if needed
  };

  const isLastStep = currentStep === module.steps.length - 1;
  const allStepsCompleted = completedSteps.length === module.steps.length;

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{module.icon}</div>
                <h1 className="text-xl font-bold text-gray-900">{module.title} - Quiz</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Quiz
            disaster={disaster}
            questions={module.quiz}
            onComplete={handleQuizComplete}
            onRetry={handleQuizRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{module.icon}</div>
              <h1 className="text-xl font-bold text-gray-900">{module.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Learning Progress</span>
            <span>{completedSteps.length}/{module.steps.length} steps completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${(completedSteps.length / module.steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Module Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Hero Image */}
          <div className="relative h-64">
            <img
              src={module.image}
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${module.color} opacity-70`}></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-4xl">{module.icon}</div>
                <h2 className="text-2xl font-bold">{module.title}</h2>
              </div>
              <p className="text-lg opacity-90">Step {currentStep + 1} of {module.steps.length}</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${module.color}`}>
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {module.steps[currentStep].title}
                </h3>
                {completedSteps.includes(currentStep) && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {module.steps[currentStep].content}
              </p>

              {/* Tips */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Important Tips:</h4>
                </div>
                <ul className="space-y-2">
                  {module.steps[currentStep].tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="mt-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-blue-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {module.steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep
                        ? `bg-gradient-to-r ${module.color}`
                        : completedSteps.includes(index)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-4">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {!completedSteps.includes(currentStep) && (
                  <button
                    onClick={handleStepComplete}
                    className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${module.color} text-white rounded-lg hover:shadow-lg transition-all`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Mark Complete</span>
                  </button>
                )}

                {!isLastStep && completedSteps.includes(currentStep) && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className={`px-6 py-3 bg-gradient-to-r ${module.color} text-white rounded-lg hover:shadow-lg transition-all`}
                  >
                    Next Step
                  </button>
                )}

                {isLastStep && allStepsCompleted && (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Award className="h-5 w-5" />
                    <span>Take Quiz</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;