document.addEventListener('DOMContentLoaded', () => {
    const s = LevelUpAuth.currentSession();
    const user = LevelUpProgression.currentUser();

    if (!s) return;

    document.querySelectorAll('[data-user-name]').forEach(n => {
        n.textContent = (user?.name || s.name).split(' ')[0];
    });

    const en = LevelUpData.getEnrollments().filter(
        e => e.userId === s.userId
    );

    const subs = LevelUpData.getSubmissions().filter(
        x => x.userId === s.userId
    );

    const completed =
        en.filter(e => e.status === 'completed').length +
        subs.filter(
            x =>
                x.status === 'approved' &&
                !en.some(
                    e =>
                        e.challengeId === x.challengeId &&
                        e.status === 'completed'
                )
        ).length;

    document.querySelector('[data-stat="completed"]').textContent = completed;

    document.querySelector('[data-stat="active"]').textContent =
        en.filter(e => e.status === 'in-progress').length;

    document.querySelector('[data-stat="achievements"]').textContent =
        LS.get('earnedAchievements', []).filter(
            a => a.userId === s.userId
        ).length;

    document.querySelector('[data-stat="xp"]').textContent =
        LevelUpData.getXP();

    const paths = LevelUpData.getPaths();

    const path =
        paths.find(
            p => p.categoryKey === (user?.interests?.[0] || 'learning')
        ) || paths[0];

    const relevant = path.challengeIds
        .map(id => LevelUpData.challengeById(id))
        .filter(Boolean);

    const done = relevant.filter(
        c =>
            en.some(
                e =>
                    e.challengeId === c.id &&
                    e.status === 'completed'
            ) ||
            subs.some(
                x =>
                    x.challengeId === c.id &&
                    x.status === 'approved'
            )
    ).length;

    document.getElementById('dashboard-path').innerHTML =
        `<div class="dashboard-path-mini"><img src="${path.art}" alt=""><div style="flex:1"><div class="between"><strong>${LevelUpUI.escapeHTML(path.title)}</strong><span class="badge lavender">${done}/${relevant.length} stages</span></div><p class="small">${LevelUpUI.escapeHTML(path.description)}</p><div class="progress-track"><div class="progress-fill" style="width:${relevant.length ? done / relevant.length * 100 : 0}%"></div></div><a class="link" href="growth-path.html?id=${path.id}">Continue the journey ↗</a></div></div>`;

    const activeIds = en
        .filter(e => e.status === 'in-progress')
        .map(e => e.challengeId);


const active = activeIds
    .map(id => LevelUpData.challengeById(id))
    .filter(Boolean);

document.getElementById('dashboard-active').innerHTML =
    active.length
        ? active.slice(0, 3)
            .map(challenge => LevelUpUI.challengeCard(challenge))
            .join('')
        : LevelUpUI.emptyState(
            'No active challenges yet',
            'Choose your first challenge to get started.',
            '<a class="btn btn-primary" href="challenges.html">Explore Challenges</a>'
        );

    

const recommendation = LevelUpData.getChallenges()
    .filter(c => c.status === 'active' && !activeIds.includes(c.id))
    .filter(
        c =>
            !c.prerequisite ||
            subs.some(
                x =>
                    x.challengeId === c.prerequisite &&
                    x.status === 'approved'
            ) ||
            en.some(
                e =>
                    e.challengeId === c.prerequisite &&
                    e.status === 'completed'
            )
    )
    .slice(0, 4);

document.getElementById('dashboard-recommended').innerHTML =
    recommendation.length
        ? recommendation
            .map(challenge => LevelUpUI.challengeCard(challenge))
            .join('')
        : LevelUpUI.emptyState(
            'Everything is covered',
            'Try exploring another development path.',
            '<a class="btn btn-primary" href="challenges.html">View Challenges</a>'
        );



    const earned = LS.get('earnedAchievements', []).filter(
        a => a.userId === s.userId
    );

    const catalog = LevelUpData.getAchievements();
    const chosen = earned.slice(-2).reverse();

    document.getElementById('dashboard-achievements').innerHTML =
        chosen.length
            ? chosen
                .map(a => {
                    const c = catalog.find(
                        x => x.id === a.achievementId
                    );

                    return `<div class="activity-row"><div class="activity-icon">${c?.icon || '✦'}</div><div><strong>${c?.title || 'Achievement'}</strong><p>${c?.description || ''}</p></div><span class="badge yellow">Earned</span></div>`;
                })
                .join('')
            : LevelUpUI.emptyState(
                'Your first achievement is waiting',
                'Complete a challenge and meet its criteria to earn an achievement.'
            );
});