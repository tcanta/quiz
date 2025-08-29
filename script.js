// Sample quiz data
const courses = {
    algo: {
        title: "Algorithmique",
        quizzes: [
            {
                id: "algo-1",
                title: "Structures de données basiques",
                description: "Tableaux, listes et piles",
                level: 1,
                questions: [
                    {
                        question: "Quelle est la complexité temporelle de l'accès à un élément dans un tableau?",
                        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                        answer: 0,
                        explanation: "L'accès à un élément dans un tableau se fait en temps constant O(1) car on peut calculer directement sa position en mémoire."
                    },
                    {
                        question: "Quelle structure suit le principe LIFO?",
                        options: ["File", "Pile", "Liste chaînée", "Arbre"],
                        answer: 1,
                        explanation: "La pile suit le principe Last In First Out (LIFO), le dernier élément ajouté est le premier à être retiré."
                    },
                    {
                        question: "Quelle est la complexité dans le pire cas de la recherche dans une liste chaînée non triée?",
                        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                        answer: 2,
                        explanation: "Dans le pire cas, il faut parcourir tous les éléments de la liste, donc complexité linéaire O(n)."
                    }
                ]
            },
            {
                id: "algo-2",
                title: "Algorithmes de tri",
                description: "Tri par sélection, insertion et fusion",
                level: 2,
                questions: [
                    {
                        question: "Quel algorithme de tri a une complexité O(n²) dans le pire cas?",
                        options: ["Tri fusion", "Tri rapide", "Tri par insertion", "Tri par tas"],
                        answer: 2,
                        explanation: "Le tri par insertion a une complexité O(n²) dans le pire cas quand la liste est triée à l'envers."
                    },
                    {
                        question: "Quel algorithme utilise la stratégie 'diviser pour régner'?",
                        options: ["Tri par sélection", "Tri par insertion", "Tri fusion", "Tri à bulles"],
                        answer: 2,
                        explanation: "Le tri fusion divise la liste en deux moitiés, les trie récursivement, puis fusionne les deux moitiés triées."
                    },
                    {
                        question: "Quelle est la complexité du tri fusion dans le pire cas?",
                        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                        answer: 1,
                        explanation: "Le tri fusion a toujours une complexité O(n log n), même dans le pire cas."
                    }
                ]
            }
        ]
    },
    prog: {
        title: "Programmation",
        quizzes: [
            {
                id: "prog-1",
                title: "Bases de la programmation",
                description: "Variables, boucles et conditions",
                level: 1,
                questions: [
                    {
                        question: "Quel mot-clé permet de déclarer une constante en JavaScript?",
                        options: ["var", "let", "const", "static"],
                        answer: 2,
                        explanation: "Le mot-clé 'const' permet de déclarer une constante en JavaScript."
                    },
                    {
                        question: "Quelle boucle est garantie de s'exécuter au moins une fois?",
                        options: ["for", "while", "do...while", "forEach"],
                        answer: 2,
                        explanation: "La boucle do...while vérifie la condition après la première exécution, donc elle s'exécute toujours au moins une fois."
                    },
                    {
                        question: "Quel opérateur permet de comparer à la fois la valeur et le type?",
                        options: ["==", "===", "=", "!=="],
                        answer: 1,
                        explanation: "L'opérateur '===' compare à la fois la valeur et le type, contrairement à '==' qui ne compare que les valeurs après conversion de type."
                    }
                ]
            }
        ]
    },
    bd: {
        title: "Bases de Données",
        quizzes: [
            {
                id: "bd-1",
                title: "Introduction à SQL",
                description: "Requêtes SELECT de base",
                level: 2,
                questions: [
                    {
                        question: "Quelle clause permet de filtrer les résultats d'une requête SQL?",
                        options: ["SELECT", "FROM", "WHERE", "GROUP BY"],
                        answer: 2,
                        explanation: "La clause WHERE permet de filtrer les lignes selon une condition."
                    },
                    {
                        question: "Quel mot-clé permet d'éliminer les doublons dans un résultat?",
                        options: ["UNIQUE", "DISTINCT", "DIFFERENT", "ONLY"],
                        answer: 1,
                        explanation: "Le mot-clé DISTINCT permet d'éliminer les lignes en double dans le résultat."
                    },
                    {
                        question: "Quelle fonction permet de compter le nombre de lignes?",
                        options: ["TOTAL()", "SUM()", "COUNT()", "NUMBER()"],
                        answer: 2,
                        explanation: "La fonction COUNT() retourne le nombre de lignes correspondant à la requête."
                    }
                ]
            }
        ]
    }
};

// DOM Elements
const courseSelection = document.getElementById('courseSelection');
const quizSelection = document.getElementById('quizSelection');
const quizContainer = document.getElementById('quizContainer');
const resultsSection = document.getElementById('resultsSection');
const dashboardSection = document.getElementById('dashboardSection');
const selectedCourseTitle = document.getElementById('selectedCourseTitle');
const quizList = document.getElementById('quizList');
const currentQuizTitle = document.getElementById('currentQuizTitle');
const questionContainer = document.getElementById('questionContainer');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const prevQuestionBtn = document.getElementById('prevQuestion');
const nextQuestionBtn = document.getElementById('nextQuestion');
const submitQuizBtn = document.getElementById('submitQuiz');
const backToCoursesBtn = document.getElementById('backToCourses');
const backToQuizzesBtn = document.getElementById('backToQuizzes');
const backFromDashboardBtn = document.getElementById('backFromDashboard');
const retryQuizBtn = document.getElementById('retryQuiz');
const newQuizBtn = document.getElementById('newQuiz');
const scoreDisplay = document.getElementById('scoreDisplay');
const correctAnswers = document.getElementById('correctAnswers');
const timeTaken = document.getElementById('timeTaken');
const skillAnalysis = document.getElementById('skillAnalysis');
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenu = document.getElementById('userMenu');
const dashboardLink = document.getElementById('dashboardLink');
const dashboardHeaderBtn = document.getElementById('dashboardHeaderBtn');
const totalQuizzes = document.getElementById('totalQuizzes');
const averageScore = document.getElementById('averageScore');
const successRate = document.getElementById('successRate');
const categoryCharts = document.getElementById('categoryCharts');
const recentResults = document.getElementById('recentResults');

// Quiz State
let currentCourse = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = null;
let timerInterval = null;

// Event Listeners
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => selectCourse(card.dataset.course));
});

backToCoursesBtn.addEventListener('click', () => {
    quizSelection.classList.add('hidden');
    courseSelection.classList.remove('hidden');
});

backToQuizzesBtn.addEventListener('click', () => {
    quizContainer.classList.add('hidden');
    quizSelection.classList.remove('hidden');
    clearInterval(timerInterval);
});

backFromDashboardBtn.addEventListener('click', () => {
    dashboardSection.classList.add('hidden');
    courseSelection.classList.remove('hidden');
});

prevQuestionBtn.addEventListener('click', showPreviousQuestion);
nextQuestionBtn.addEventListener('click', showNextQuestion);
submitQuizBtn.addEventListener('click', submitQuiz);
retryQuizBtn.addEventListener('click', retryQuiz);
newQuizBtn.addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    quizSelection.classList.remove('hidden');
});

userMenuBtn.addEventListener('click', () => {
    userMenu.classList.toggle('hidden');
});

dashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    courseSelection.classList.add('hidden');
    quizSelection.classList.add('hidden');
    quizContainer.classList.add('hidden');
    resultsSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    showDashboard();
});

dashboardHeaderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    courseSelection.classList.add('hidden');
    quizSelection.classList.add('hidden');
    quizContainer.classList.add('hidden');
    resultsSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    showDashboard();
});

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
    if (!userMenu.contains(e.target) && e.target !== userMenuBtn) {
        userMenu.classList.add('hidden');
    }
});

// Cookie management - Store all quiz results in an array
function getCookie(name) {
    try {
        const cookieString = document.cookie;
        if (!cookieString) return null;
        
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    } catch (error) {
        console.error('Error reading cookie:', error);
        return null;
    }
}

function setCookie(name, value, days) {
    try {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        
        // Use more permissive settings for deployment
        let cookieString = `${name}=${encodeURIComponent(value)};${expires};path=/`;
        
        // Add secure flag if on HTTPS
        if (window.location.protocol === 'https:') {
            cookieString += ';Secure';
        }
        
        // Use SameSite=None for cross-site compatibility
        cookieString += ';SameSite=None';
        
        document.cookie = cookieString;
        console.log('Cookie set:', name, value);
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

function getQuizResults() {
    try {
        const results = getCookie('quizResults');
        console.log('Retrieved cookie value:', results);
        
        if (!results) return [];
        
        const parsed = JSON.parse(results);
        console.log('Parsed quiz results:', parsed);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error('Error parsing quiz results cookie:', e);
        return [];
    }
}

function addQuizResult(quizId, passed, score) {
    try {
        const results = getQuizResults();
        
        // Always add a new result (don't update existing ones)
        results.push({
            quizId: quizId,
            status: passed ? 'passed' : 'failed',
            score: score,
            timestamp: new Date().toISOString()
        });
        console.log('Adding new quiz result:', quizId, score);
        
        setCookie('quizResults', JSON.stringify(results), 365); // Store for 1 year
        
        console.log('Total quiz results:', results.length);
    } catch (error) {
        console.error('Error adding quiz result:', error);
    }
}

function getLatestQuizStatus() {
    const results = getQuizResults();
    const status = {};
    
    // Sort results by timestamp (newest first) to get the latest attempt for each quiz
    const sortedResults = [...results].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    sortedResults.forEach(result => {
        // Only keep the first (most recent) result for each quiz
        if (!status[result.quizId]) {
            status[result.quizId] = {
                status: result.status,
                score: result.score,
                timestamp: result.timestamp
            };
        }
    });
    
    return status;
}

// Functions
function selectCourse(courseId) {
    currentCourse = courses[courseId];
    selectedCourseTitle.textContent = currentCourse.title;
    
    // Populate quiz list
    quizList.innerHTML = '';
    currentCourse.quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition cursor-pointer';
        quizCard.dataset.quizId = quiz.id;
        
        const quizStatus = getLatestQuizStatus()[quiz.id];
        let statusClass = '';
        let statusText = '';
        let scoreText = '';
        
        if (quizStatus) {
            statusClass = quizStatus.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            statusText = quizStatus.status === 'passed' ? 'Réussi' : 'Échoué';
            scoreText = `<div class="text-sm mt-2 font-medium ${quizStatus.status === 'passed' ? 'text-green-700' : 'text-red-700'}">Score précédent: ${quizStatus.score}%</div>`;
        } else {
            statusClass = 'bg-gray-100 text-gray-800';
            statusText = 'Nouveau';
        }
        
        quizCard.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-bold text-lg text-gray-800">${quiz.title}</h4>
                <div class="flex items-center space-x-2">
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Niveau ${quiz.level}</span>
                    <span class="${statusClass} text-xs px-2 py-1 rounded-full">${statusText}</span>
                </div>
            </div>
            <p class="text-gray-600 mb-3">${quiz.description}</p>
            ${scoreText}
            <div class="flex justify-between items-center text-sm mt-3">
                <span class="text-gray-500">${quiz.questions.length} questions</span>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition">
                    ${quizStatus ? 'Reprendre' : 'Commencer'} <i class="fas fa-arrow-right ml-1"></i>
                </button>
            </div>
        `;
        
        quizCard.addEventListener('click', () => startQuiz(quiz.id));
        quizList.appendChild(quizCard);
    });
    
    courseSelection.classList.add('hidden');
    quizSelection.classList.remove('hidden');
}

function startQuiz(quizId) {
    try {
        currentQuiz = currentCourse.quizzes.find(q => q.id === quizId);
        currentQuizTitle.textContent = currentQuiz.title;
        currentQuestionIndex = 0;
        userAnswers = Array(currentQuiz.questions.length).fill(null);
        
        // Start timer
        quizStartTime = new Date();
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        
        // Initialize progress
        updateProgress();
        
        // Show first question
        renderQuestion(currentQuestionIndex);
        
        quizSelection.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        // Debug: verify cookies are accessible
        console.log('Current quiz results:', getQuizResults());
    } catch (error) {
        console.error('Error starting quiz:', error);
        alert('Erreur lors du démarrage du quiz. Veuillez réessayer.');
    }
}

function renderQuestion(index) {
    const question = currentQuiz.questions[index];
    
    // Create question card
    const questionCard = document.createElement('div');
    questionCard.className = 'question-card active bg-white rounded-lg shadow-md p-6 mb-4';
    
    questionCard.innerHTML = `
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Question ${index + 1}</h3>
        <p class="text-lg mb-6">${question.question}</p>
        <div class="space-y-3" id="optionsContainer">
            ${question.options.map((option, i) => `
                <div class="option p-4 border rounded-lg cursor-pointer transition ${userAnswers[index] === i ? 'bg-blue-100 border-blue-300 selected' : 'hover:bg-gray-50 border-gray-200'}" data-option="${i}">
                    ${String.fromCharCode(65 + i)}. ${option}
                </div>
            `).join('')}
        </div>
        ${userAnswers[index] !== null ? `
            <div class="mt-6 p-4 bg-${question.answer === userAnswers[index] ? 'green' : 'red'}-50 rounded-lg">
                <h4 class="font-semibold text-${question.answer === userAnswers[index] ? 'green' : 'red'}-700 mb-2">
                    <i class="fas fa-${question.answer === userAnswers[index] ? 'check' : 'times'} mr-2"></i>
                    ${question.answer === userAnswers[index] ? 'Correct!' : 'Incorrect'}
                </h4>
                <p class="text-gray-700">${question.explanation}</p>
            </div>
        ` : ''}
    `;
    
    // Clear previous question and add new one
    questionContainer.innerHTML = '';
    questionContainer.appendChild(questionCard);
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => selectOption(index, parseInt(option.dataset.option)));
    });
    
    // Update navigation buttons
    prevQuestionBtn.disabled = index === 0;
    nextQuestionBtn.textContent = index === currentQuiz.questions.length - 1 ? 'Vérifier les réponses' : 'Suivant';
    nextQuestionBtn.classList.toggle('hidden', index === currentQuiz.questions.length - 1);
    submitQuizBtn.classList.toggle('hidden', index !== currentQuiz.questions.length - 1);
}

function selectOption(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    renderQuestion(questionIndex);
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateProgress();
        renderQuestion(currentQuestionIndex);
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        updateProgress();
        renderQuestion(currentQuestionIndex);
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} sur ${currentQuiz.questions.length}`;
}

function updateTimer() {
    const now = new Date();
    const elapsed = new Date(now - quizStartTime);
    const minutes = elapsed.getMinutes().toString().padStart(2, '0');
    const seconds = elapsed.getSeconds().toString().padStart(2, '0');
    timer.textContent = `Temps passé: ${minutes}:${seconds}`;
}

function submitQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    const correct = currentQuiz.questions.reduce((acc, question, index) => {
        return acc + (question.answer === userAnswers[index] ? 1 : 0);
    }, 0);
    
    const score = Math.round((correct / currentQuiz.questions.length) * 100);
    const elapsed = new Date(new Date() - quizStartTime);
    const minutes = elapsed.getMinutes().toString().padStart(2, '0');
    const seconds = elapsed.getSeconds().toString().padStart(2, '0');
    
    // Display results
    scoreDisplay.textContent = `${score}%`;
    correctAnswers.textContent = `${correct} / ${currentQuiz.questions.length}`;
    timeTaken.textContent = `${minutes}:${seconds}`;
    
    // Generate skill analysis (simplified for demo)
    skillAnalysis.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-medium">Compréhension des concepts</span>
            <div class="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${score}%"></div>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <span class="font-medium">Application pratique</span>
            <div class="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${Math.max(0, score - 20)}%"></div>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <span class="font-medium">Analyse critique</span>
            <div class="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${Math.max(0, score - 30)}%"></div>
            </div>
        </div>
    `;
    
    // Store quiz result in cookie
    const passed = score >= 70; // 70% threshold for passing
    addQuizResult(currentQuiz.id, passed, score);
    
    quizContainer.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

function retryQuiz() {
    resultsSection.classList.add('hidden');
    startQuiz(currentQuiz.id);
}

// Dashboard functions
function showDashboard() {
    const results = getQuizResults();
    
    // Get only the most recent attempt for each quiz for dashboard statistics
    const latestResults = [];
    const seenQuizIds = new Set();
    
    // Sort results by timestamp (newest first) and take only the latest attempt per quiz
    const sortedResults = [...results].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    sortedResults.forEach(result => {
        if (!seenQuizIds.has(result.quizId)) {
            latestResults.push(result);
            seenQuizIds.add(result.quizId);
        }
    });
    
    // Calculate global statistics using only latest attempts
    const completedQuizzes = latestResults.length;
    const totalScore = latestResults.reduce((sum, result) => sum + result.score, 0);
    const avgScore = completedQuizzes > 0 ? Math.round(totalScore / completedQuizzes) : 0;
    const passedQuizzes = latestResults.filter(result => result.status === 'passed').length;
    const successRateValue = completedQuizzes > 0 ? Math.round((passedQuizzes / completedQuizzes) * 100) : 0;
    
    // Update global stats
    totalQuizzes.textContent = completedQuizzes;
    averageScore.textContent = `${avgScore}%`;
    successRate.textContent = `${successRateValue}%`;
    
    // Calculate category completion using only latest attempts
    const categoryStats = calculateCategoryStats(latestResults);
    renderCategoryCharts(categoryStats);
    
    // Show all results in history (not just latest)
    renderRecentResults(results);
}

function calculateCategoryStats(results) {
    const stats = {};
    
    // Initialize categories
    Object.keys(courses).forEach(courseId => {
        stats[courseId] = {
            completed: 0,
            total: courses[courseId].quizzes.length,
            passed: 0,
            totalScore: 0
        };
    });
    
    // Count completed quizzes per category
    results.forEach(result => {
        // Find which category this quiz belongs to
        for (const [courseId, course] of Object.entries(courses)) {
            const quiz = course.quizzes.find(q => q.id === result.quizId);
            if (quiz) {
                stats[courseId].completed++;
                stats[courseId].totalScore += result.score;
                if (result.status === 'passed') {
                    stats[courseId].passed++;
                }
                break;
            }
        }
    });
    
    return stats;
}

function renderCategoryCharts(stats) {
    categoryCharts.innerHTML = '';
    
    Object.entries(stats).forEach(([courseId, data]) => {
        const averageScore = data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0;
        const chartContainer = document.createElement('div');
        chartContainer.className = 'text-center';
        
        chartContainer.innerHTML = `
            <h4 class="font-semibold mb-4 text-gray-700">${courses[courseId].title}</h4>
            <div class="relative mx-auto" style="width: 150px; height: 150px;">
                <canvas id="chart-${courseId}" width="150" height="150"></canvas>
                <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-lg font-bold">${averageScore}%</span>
                </div>
            </div>
            <p class="mt-2 text-sm text-gray-600">Score moyen: ${averageScore}%</p>
            <p class="text-sm text-gray-600">${data.completed}/${data.total} quiz complétés</p>
        `;
        
        categoryCharts.appendChild(chartContainer);
    });
    
    // Create charts after they are added to the DOM
    setTimeout(() => {
        Object.entries(stats).forEach(([courseId, data]) => {
            const ctx = document.getElementById(`chart-${courseId}`);
            if (ctx) {
                const averageScore = data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0;
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Score moyen', 'Restant'],
                        datasets: [{
                            data: [averageScore, 100 - averageScore],
                            backgroundColor: ['#3B82F6', '#E5E7EB'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%',
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        animation: {
                            animateScale: true
                        }
                    }
                });
            }
        });
    }, 100);
}

function renderRecentResults(results) {
    // Sort by timestamp (newest first) and take last 5
    const recent = [...results]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
    
    recentResults.innerHTML = '';
    
    if (recent.length === 0) {
        recentResults.innerHTML = `
            <tr>
                <td colspan="5" class="py-4 px-4 text-center text-gray-500">
                    Aucun quiz complété pour le moment
                </td>
            </tr>
        `;
        return;
    }
    
    recent.forEach(result => {
        // Find quiz details
        let quizTitle = 'Quiz inconnu';
        let category = 'Inconnue';
        
        for (const [courseId, course] of Object.entries(courses)) {
            const quiz = course.quizzes.find(q => q.id === result.quizId);
            if (quiz) {
                quizTitle = quiz.title;
                category = course.title;
                break;
            }
        }
        
        const date = new Date(result.timestamp);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-gray-50';
        row.innerHTML = `
            <td class="py-3 px-4">${quizTitle}</td>
            <td class="py-3 px-4">${category}</td>
            <td class="py-3 px-4 font-medium ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}">${result.score}%</td>
            <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs ${result.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${result.status === 'passed' ? 'Réussi' : 'Échoué'}
                </span>
            </td>
            <td class="py-3 px-4 text-gray-500">${formattedDate}</td>
        `;
        
        recentResults.appendChild(row);
    });
}

