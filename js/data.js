(function () {
    const challenges = [
        {
            id: 'reading-01',
            title: 'Reading Habit',
            category: 'Learning & Focus',
            categoryKey: 'learning',
            difficulty: 'Beginner',
            duration: '7 days',
            durationDays: 7,
            minutes: 20,
            description: 'Build a reading habit through short, consistent sessions.',
            objective: 'Build a reading habit and record your basic understanding.',
            tasks: [
                'Read for at least 20 minutes',
                'Note the first and last page',
                'Write down one thing you learned'
            ],
            criteria: 'Complete at least 5 of 7 sessions and fill in the final reflection.',
            proofType: 'Session log + reflection',
            verification: 'System-checked',
            xp: 80,
            pathId: 'reading-path',
            stage: 1,
            prerequisite: null,
            status: 'active',
            icon: '📚',
            art: 'assets/images/challenges/learning/Reading Habit.png',
            featured: true
        },
        {
            id: 'reading-02',
            title: 'Reading Reflection',
            category: 'Learning & Focus',
            categoryKey: 'learning',
            difficulty: 'Beginner',
            duration: '3 days',
            durationDays: 3,
            minutes: 15,
            description: 'Practice understanding with a short summary of the reading.',
            objective: 'Express the main idea in your own words.',
            tasks: [
                'Choose one reading',
                'Write a 100–150 word summary',
                'Write one critical question'
            ],
            criteria: 'The summary includes the main idea and personal reflection.',
            proofType: 'Written reflection',
            verification: 'Assessor review',
            xp: 100,
            pathId: 'reading-path',
            stage: 2,
            prerequisite: 'reading-01',
            status: 'active',
            icon: '✍️',
            art: 'assets/images/challenges/learning/Reading Reflection.png',
            featured: true
        },
        {
            id: 'reading-03',
            title: 'Critical Thinking',
            category: 'Learning & Focus',
            categoryKey: 'learning',
            difficulty: 'Intermediate',
            duration: '5 days',
            durationDays: 5,
            minutes: 25,
            description: 'Learn to evaluate arguments and build your own perspective.',
            objective: 'Practice analyzing information and making arguments.',
            tasks: [
                'Choose an article',
                'Identify the main claim',
                'Record two supporting pieces of evidence',
                'Write a conclusion'
            ],
            criteria: 'The analysis includes a claim, evidence, and a logically connected conclusion.',
            proofType: 'Analysis document',
            verification: 'Assessor review',
            xp: 150,
            pathId: 'reading-path',
            stage: 3,
            prerequisite: 'reading-02',
            status: 'active',
            icon: '🧠',
            art: 'assets/images/challenges/learning/Critical Thinking.png',
            featured: false
        },
        {
            id: 'creative-01',
            title: 'Visual Observation',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            difficulty: 'Beginner',
            duration: '3 days',
            durationDays: 3,
            minutes: 15,
            description: 'Train your creative eye to observe shape, color, and composition.',
            objective: 'Improve your visual observation skills.',
            tasks: [
                'Choose a simple object',
                'Capture or create a reference',
                'Note three things you observed'
            ],
            criteria: 'Your notes include three specific observations.',
            proofType: 'Image + notes',
            verification: 'System-checked',
            xp: 70,
            pathId: 'creative-path',
            stage: 1,
            prerequisite: null,
            status: 'active',
            icon: '🎨',
            art: 'assets/images/challenges/creative/Visual Observation.png',
            featured: true
        },
        {
            id: 'creative-02',
            title: 'Basic Composition',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            difficulty: 'Beginner',
            duration: '4 days',
            durationDays: 4,
            minutes: 25,
            description: 'Create a simple visual work with deliberate composition.',
            objective: 'Apply visual hierarchy and basic composition.',
            tasks: [
                'Choose a brief',
                'Create a sketch',
                'Define the focal point',
                'Upload the final result'
            ],
            criteria: 'The work matches the brief and has a clear focal point.',
            proofType: 'Work artifact',
            verification: 'Assessor review',
            xp: 120,
            pathId: 'creative-path',
            stage: 2,
            prerequisite: 'creative-01',
            status: 'active',
            icon: '🖼️',
            art: 'assets/images/challenges/creative/Basic Composition.png',
            featured: true
        },
        {
            id: 'creative-03',
            title: 'Design Challenge',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            difficulty: 'Intermediate',
            duration: '7 days',
            durationDays: 7,
            minutes: 40,
            description: 'Complete a mini design brief from concept to final result.',
            objective: 'Develop a design problem-solving process.',
            tasks: [
                'Understand the brief',
                'Create two ideas',
                'Choose and develop one idea',
                'Upload the result and design rationale'
            ],
            criteria: 'The final result answers the brief and includes a rationale for the design decision.',
            proofType: 'Design artifact + rationale',
            verification: 'Assessor review',
            xp: 180,
            pathId: 'creative-path',
            stage: 3,
            prerequisite: 'creative-02',
            status: 'active',
            icon: '✳️',
            art: 'assets/images/challenges/creative/Design Challenge.png',
            featured: false
        },
        {
            id: 'healthy-01',
            title: 'Morning Routine',
            category: 'Healthy Habits',
            categoryKey: 'healthy',
            difficulty: 'Beginner',
            duration: '5 days',
            durationDays: 5,
            minutes: 10,
            description: 'Build a realistic morning routine that fits your needs.',
            objective: 'Recognize morning patterns that help you start the day well.',
            tasks: [
                'Choose one simple routine',
                'Do it on schedule',
                'Write a short note about the experience'
            ],
            criteria: 'Record at least 4 out of 5 days and add a reflection.',
            proofType: 'Daily check-in',
            verification: 'Self-reported + spot check',
            xp: 60,
            pathId: 'healthy-path',
            stage: 1,
            prerequisite: null,
            status: 'active',
            icon: '🌱',
            art: 'assets/images/challenges/healthy/Morning Routine.png',
            featured: true
        },
        {
            id: 'code-01',
            title: 'Problem Solving Basics',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            difficulty: 'Beginner',
            duration: '4 days',
            durationDays: 4,
            minutes: 30,
            description: 'Break a simple problem into steps you can work through.',
            objective: 'Practice logic and structured problem solving.',
            tasks: [
                'Choose one problem',
                'Write the input and output',
                'Create a solution flow',
                'Test one example'
            ],
            criteria: 'The solution has logical steps and an example test.',
            proofType: 'Solution notes',
            verification: 'System-checked + sample review',
            xp: 90,
            pathId: 'coding-path',
            stage: 1,
            prerequisite: null,
            status: 'active',
            icon: '💻',
            art: 'assets/images/challenges/programming/Problem Solving Basics.png',
            featured: false
        },
        {
            id: 'code-02',
            title: 'Mini Coding Project',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            difficulty: 'Intermediate',
            duration: '7 days',
            durationDays: 7,
            minutes: 45,
            description: 'Build a small project that solves a real need.',
            objective: 'Combine logic and implementation into a working project.',
            tasks: [
                'Define the need',
                'Build the core feature',
                'Test the result',
                'Document the usage'
            ],
            criteria: 'The project works for the main scenario and includes brief documentation.',
            proofType: 'Project files or repository',
            verification: 'Assessor review',
            xp: 200,
            pathId: 'coding-path',
            stage: 2,
            prerequisite: 'code-01',
            status: 'active',
            icon: '🚀',
            art: 'assets/images/challenges/programming/Mini Coding Project.png',
            featured: false
        }
    ];

    const paths = [
        {
            id: 'reading-path',
            title: 'Reading & Critical Thinking',
            category: 'Learning & Focus',
            categoryKey: 'learning',
            description: 'Build a reading routine, understand ideas, and practice critical thinking.',
            goal: 'Turn reading into understanding and reflection.',
            duration: '15 days',
            level: 'Beginner → Intermediate',
            icon: '📚',
            art: 'assets/images/growth-plan/Reading & Critical Thinking.jpeg',
            challengeIds: [
                'reading-01',
                'reading-02',
                'reading-03'
            ],
            status: 'active'
        },
        {
            id: 'creative-path',
            title: 'Creative Design Journey',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            description: 'Practice visual observation, composition, and simple design brief execution.',
            goal: 'Build a creative process from observation to finished work.',
            duration: '14 days',
            level: 'Beginner → Intermediate',
            icon: '🎨',
            art: 'assets/images/growth-plan/Creative Design Journey.jpeg',
            challengeIds: [
                'creative-01',
                'creative-02',
                'creative-03'
            ],
            status: 'active'
        },
        {
            id: 'healthy-path',
            title: 'Healthy Habit Starter',
            category: 'Healthy Habits',
            categoryKey: 'healthy',
            description: 'Design a small, realistic routine and reflect on what works for you.',
            goal: 'Build a habit without excessive streak pressure.',
            duration: '5 days',
            level: 'Beginner',
            icon: '🌿',
            art: 'assets/images/growth-plan/Healthy Habit Starter.jpeg',
            challengeIds: [
                'healthy-01'
            ],
            status: 'active'
        },
        {
            id: 'coding-path',
            title: 'Programming Foundation',
            category: 'Creative & Digital Skills',
            categoryKey: 'creative',
            description: 'Understand problem solving and apply it in a mini project.',
            goal: 'Move from basic logic to a small working project.',
            duration: '11 days',
            level: 'Beginner → Intermediate',
            icon: '💻',
            art: 'assets/images/growth-plan/Programming Foundation.jpeg',
            challengeIds: [
                'code-01',
                'code-02'
            ],
            status: 'active'
        }
    ];

    const achievements = [
        {
            id: 'first-step',
            title: 'First Step',
            description: 'Complete your first challenge.',
            icon: '🌟',
            art: 'assets/images/achievements/consistency.svg',
            criteria: 'Complete 1 challenge that meets the criteria.',
            xp: 30,
            unlock: null
        },
        {
            id: 'book-explorer',
            title: 'Book Explorer',
            description: 'Complete the first stage of the Reading Path.',
            icon: '📖',
            art: 'assets/images/achievements/reading.svg',
            criteria: 'Complete Reading Habit.',
            xp: 50,
            unlock: 'reading-02'
        },
        {
            id: 'creative-mind',
            title: 'Creative Mind',
            description: 'Complete your first creative challenge.',
            icon: '🎨',
            art: 'assets/images/achievements/creativity.svg',
            criteria: 'Complete Visual Observation.',
            xp: 40,
            unlock: 'creative-02'
        },
        {
            id: 'steady-steps',
            title: 'Steady Steps',
            description: 'Maintain your activity rhythm over time.',
            icon: '🌱',
            art: 'assets/images/achievements/consistency.svg',
            criteria: 'Record five valid sessions.',
            xp: 40,
            unlock: null
        },
        {
            id: 'deep-thinker',
            title: 'Deep Thinker',
            description: 'Complete the analysis challenge.',
            icon: '🧠',
            art: 'assets/images/achievements/focus.svg',
            criteria: 'Complete Critical Thinking.',
            xp: 80,
            unlock: null
        }
    ];

    const users = [
        {
            id: 'user-demo',
            name: 'Karina',
            email: 'user@levelup.id',
            password: 'user123',
            role: 'user',
            goal: 'Build a habit of learning and critical thinking',
            interests: ['learning'],
            availableTime: '20–30 minutes per day',
            avatar: 'assets/images/avatars/karina.jpg'
        },
        {
            id: 'admin-demo',
            name: 'LevelUp Admin',
            email: 'admin@levelup.id',
            password: 'admin123',
            role: 'admin',
            avatar: 'A'
        }
    ];

    function seed() {
        if (!LS.get('initialized', false)) {
            LS.set('users', users);
            LS.set('challenges', challenges);
            LS.set('paths', paths);
            LS.set('achievements', achievements);

            LS.set('enrollments', [
                {
                    id: 'enroll-1',
                    userId: 'user-demo',
                    challengeId: 'reading-01',
                    status: 'in-progress',
                    progress: 60,
                    completedTasks: [0, 1],
                    joinedAt: new Date().toISOString(),
                    lastActivity: new Date().toISOString()
                },
                {
                    id: 'enroll-2',
                    userId: 'user-demo',
                    challengeId: 'creative-01',
                    status: 'in-progress',
                    progress: 33,
                    completedTasks: [0],
                    joinedAt: new Date().toISOString(),
                    lastActivity: new Date().toISOString()
                }
            ]);

            LS.set('submissions', [
                {
                    id: 'sub-demo-1',
                    userId: 'user-demo',
                    challengeId: 'reading-02',
                    filename: 'reading-reflection.pdf',
                    reflection: 'I learned how to summarize the main ideas from the reading.',
                    status: 'pending',
                    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
                    reviewReason: '',
                    risk: 'normal'
                },
                {
                    id: 'sub-demo-2',
                    userId: 'user-demo',
                    challengeId: 'creative-02',
                    filename: 'composition-study.png',
                    reflection: 'I tried to position the focal point in the composition.',
                    status: 'needs-review',
                    submittedAt: new Date(Date.now() - 86400000).toISOString(),
                    reviewReason: 'Needs additional review for the work produced.',
                    risk: 'attention'
                }
            ]);

            LS.set('reviewHistory', []);
            LS.set('profile', users[0]);
            LS.set('xp', 120);
            LS.set('initialized', true);
        }
    }

    window.LevelUpData = {
        seed,
        defaultChallenges: challenges,
        defaultPaths: paths,
        defaultAchievements: achievements,

        getUsers: () => LS.get('users', []),
        getChallenges: () => LS.get('challenges', []),
        setChallenges: v => LS.set('challenges', v),

        getPaths: () => LS.get('paths', []),
        setPaths: v => LS.set('paths', v),

        getAchievements: () => LS.get('achievements', []),

        getEnrollments: () => LS.get('enrollments', []),
        setEnrollments: v => LS.set('enrollments', v),

        getSubmissions: () => LS.get('submissions', []),
        setSubmissions: v => LS.set('submissions', v),

        getReviewHistory: () => LS.get('reviewHistory', []),
        setReviewHistory: v => LS.set('reviewHistory', v),

        getProfile: () => LS.get('profile', users[0]),
        setProfile: v => LS.set('profile', v),

        getXP: () => LS.get('xp', 0),
        setXP: v => LS.set('xp', v),

        challengeById: id =>
            LS.get('challenges', challenges).find(x => x.id === id),

        pathById: id =>
            LS.get('paths', paths).find(x => x.id === id),

        submissionById: id =>
            LS.get('submissions', []).find(x => x.id === id),

        enrollmentFor: (userId, challengeId) =>
            LS.get('enrollments', []).find(
                x => x.userId === userId && x.challengeId === challengeId
            )
    };

    seed();

    function migrateCatalogText(key, defaults, fields) {
        const records = LS.get(key, []);
        if (!Array.isArray(records)) return false;

        const defaultsById = new Map(defaults.map(record => [record.id, record]));
        let changed = false;

        const migrated = records.map(record => {
            const translated = defaultsById.get(record.id);
            if (!translated) return record;

            const updates = {};
            fields.forEach(field => {
                if (Object.prototype.hasOwnProperty.call(translated, field)) {
                    updates[field] = translated[field];
                }
            });

            if (!Object.keys(updates).length) return record;
            changed = true;
            return { ...record, ...updates };
        });

        return !changed || LS.set(key, migrated);
    }

    function migrateLegacyText(key, translations) {
        const records = LS.get(key, null);

        function translateRecord(record) {
            if (!record || typeof record !== 'object' || Array.isArray(record)) {
                return { value: record, changed: false };
            }

            const fields = translations[record.id];
            if (!fields) return { value: record, changed: false };

            const updates = {};
            Object.entries(fields).forEach(([field, values]) => {
                if (Object.prototype.hasOwnProperty.call(values, record[field])) {
                    updates[field] = values[record[field]];
                }
            });

            return {
                value: Object.keys(updates).length ? { ...record, ...updates } : record,
                changed: Object.keys(updates).length > 0
            };
        }

        if (Array.isArray(records)) {
            let changed = false;
            const migrated = records.map(record => {
                const result = translateRecord(record);
                changed = changed || result.changed;
                return result.value;
            });
            return !changed || LS.set(key, migrated);
        }

        const result = translateRecord(records);
        return !result.changed || LS.set(key, result.value);
    }

    if (!LS.get('englishCatalogMigrationV1', false)) {
        const goalTranslations = {
            'Membangun kebiasaan belajar dan berpikir kritis': 'Build a habit of learning and critical thinking',
            'Membangun kebiasaan membaca': 'Build a reading habit',
            'Meningkatkan kemampuan kreatif': 'Improve creative ability',
            'Belajar skill digital': 'Learn digital skills',
            'Membangun rutinitas sehat': 'Build a healthy routine'
        };
        const timeTranslations = {
            '10–15 menit per hari': '10–15 minutes per day',
            '20–30 menit per hari': '20–30 minutes per day',
            'Beberapa sesi per minggu': 'Several sessions per week'
        };

        const migrationSucceeded =
            migrateCatalogText('challenges', challenges, [
                'title', 'category', 'difficulty', 'duration', 'description',
                'objective', 'tasks', 'criteria', 'proofType', 'verification'
            ]) &&
            migrateCatalogText('paths', paths, [
                'title', 'category', 'description', 'goal', 'duration', 'level'
            ]) &&
            migrateCatalogText('achievements', achievements, [
                'title', 'description', 'criteria'
            ]) &&
            migrateLegacyText('users', {
                'user-demo': {
                    goal: goalTranslations,
                    availableTime: timeTranslations
                }
            }) &&
            migrateLegacyText('profile', {
                'user-demo': {
                    goal: goalTranslations,
                    availableTime: timeTranslations
                }
            }) &&
            migrateLegacyText('submissions', {
                'sub-demo-1': {
                    reflection: {
                        'Saya belajar merangkum ide utama dari bacaan.': 'I learned how to summarize the main ideas from the reading.'
                    }
                },
                'sub-demo-2': {
                    reflection: {
                        'Mencoba mengatur focal point pada komposisi.': 'I tried to position the focal point in the composition.'
                    },
                    reviewReason: {
                        'Perlu peninjauan tambahan pada hasil karya.': 'Needs additional review for the work produced.'
                    }
                }
            });

        if (migrationSucceeded) {
            LS.set('englishCatalogMigrationV1', true);
        }
        
    }
    
    if (!LS.get('challengeArtSyncV2', false)) {
        const savedChallenges = LS.get('challenges', []);

        if (Array.isArray(savedChallenges)) {
            const defaultArtById = new Map(
                challenges.map(challenge => [
                    challenge.id,
                    challenge.art
                ])
            );

            const updatedChallenges = savedChallenges.map(challenge => {
                const newArt = defaultArtById.get(challenge.id);

                if (!newArt) {
                    return challenge;
                }

                return {
                    ...challenge,
                    art: newArt
                };
            });

            LS.set('challenges', updatedChallenges);
            LS.set('challengeArtSyncV2', true);
        }
    }


    const updatedUsers = LS.get('users', []).map(user =>
    user.id === 'user-demo'
        ? {
            ...user,
            name: 'Karina',
            avatar: 'assets/images/avatars/karina.jpg'
        }
        : user
);

LS.set('users', updatedUsers);

const currentProfile = LS.get('profile', {});
LS.set('profile', {
    ...currentProfile,
    name: 'Karina',
    avatar: 'assets/images/avatars/karina.jpg'
});

const currentSession = LS.get('session', null);

if (currentSession?.userId === 'user-demo') {
    LS.set('session', {
        ...currentSession,
        name: 'Karina'
    });
}

})();