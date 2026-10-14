document.addEventListener('DOMContentLoaded', () => {
    const s = LevelUpAuth.currentSession();
    const listEl = document.getElementById('progress-list');
    const empty = document.getElementById('progress-empty');
    const search = document.getElementById('progress-search');
    const filter = document.getElementById('progress-filter');

    function render() {
        const user = s.userId;

        const ens = LevelUpData.getEnrollments().filter(
            e => e.userId === user
        );

        const subs = LevelUpData.getSubmissions().filter(
            x => x.userId === user
        );

        // --- 1. ACTIVE DATA ---
        const activeEnrollments = ens.filter(e => e.status === 'in-progress');
        const activeCount = activeEnrollments.length;
        
        let avgProgress = 0;
        if (activeCount > 0) {
            const totalProgress = activeEnrollments.reduce((sum, e) => sum + (e.progress || 0), 0);
            avgProgress = Math.round(totalProgress / activeCount);
        }

        // --- 2. COMPLETED DATA ---
        const completedEnrollmentsCount = ens.filter(e => e.status === 'completed').length;
        const approvedSubmissionsCount = subs.filter(
            x =>
                x.status === 'approved' &&
                !ens.some(
                    e =>
                        e.challengeId === x.challengeId &&
                        e.status === 'completed'
                )
        ).length;
        const totalCompleted = completedEnrollmentsCount + approvedSubmissionsCount;

        // --- 3. PENDING REVIEW DATA ---
        const pendingSubs = subs.filter(
            x =>
                x.status === 'pending' ||
                x.status === 'needs-review'
        );
        const pendingCount = pendingSubs.length;

        // --- 4. REJECTED / NEEDS REVISION DATA ---
        const rejectedSubs = subs.filter(x => x.status === 'rejected');
        const rejectedCount = rejectedSubs.length;

        // Insert numbers into main HTML elements
        document.getElementById('progress-active-count').textContent = activeCount;
        document.getElementById('progress-completed-count').textContent = totalCompleted;
        document.getElementById('progress-pending-count').textContent = pendingCount;
        document.getElementById('progress-rejected-count').textContent = rejectedCount;


        // --- UPDATE STATS CARDS REAL-TIME ---
        const blueCard = document.querySelector('.card-blue');
        const greenCard = document.querySelector('.card-green');
        const yellowCard = document.querySelector('.card-yellow');
        const lavenderCard = document.querySelector('.card-lavender');

        // 1. Active Card
        if (blueCard) {
            let footerEl = blueCard.querySelector('.stat-footer-content');
            if (!footerEl) {
                blueCard.insertAdjacentHTML('beforeend', `
                    <div class="stat-footer-content">
                        <span>On Track 📈</span>
                        <span class="stat-mini-badge badge-blue-sub" id="dynamic-avg-badge">${avgProgress}% Avg</span>
                    </div>
                `);
            } else {
                document.getElementById('dynamic-avg-badge').textContent = `${avgProgress}% Avg`;
            }
        }

        // 2. Completed Card
        if (greenCard) {
            let footerEl = greenCard.querySelector('.stat-footer-content');
            const greenText = totalCompleted > 0 ? `${totalCompleted} challenges successfully completed` : `No active challenges completed`;
            const greenBadge = `🏆 ${totalCompleted}`;
            
            if (!footerEl) {
                greenCard.insertAdjacentHTML('beforeend', `
                    <div class="stat-footer-content">
                        <span id="green-desc-text">${greenText}</span>
                        <span class="stat-mini-badge badge-green-sub" id="green-badge-text">${greenBadge}</span>
                    </div>
                `);
            } else {
                document.getElementById('green-desc-text').textContent = greenText;
                document.getElementById('green-badge-text').textContent = greenBadge;
            }
        }

        // 3. Pending Review Card
        if (yellowCard) {
            let footerEl = yellowCard.querySelector('.stat-footer-content');
            const fillWidth = pendingCount > 0 ? Math.min(pendingCount * 25, 100) : 0;
            const yellowDesc = pendingCount > 0 ? `${pendingCount} submissions awaiting review` : `Awaiting Decision`;

            if (!footerEl) {
                yellowCard.insertAdjacentHTML('beforeend', `
                    <div class="stat-footer-content" style="flex-direction: column; align-items: stretch; gap: 4px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span id="yellow-desc-text">${yellowDesc}</span>
                            <span class="stat-mini-badge badge-yellow-sub">Pending Review</span>
                        </div>
                        <div class="mini-progress-bar">
                            <div class="mini-progress-fill" id="yellow-fill-bar" style="width: ${fillWidth}%; background: #ca8a04;"></div>
                        </div>
                    </div>
                `);
            } else {
                document.getElementById('yellow-desc-text').textContent = yellowDesc;
                document.getElementById('yellow-fill-bar').style.width = `${fillWidth}%`;
            }
        }

        // 4. Needs Revision Card
        if (lavenderCard) {
            let footerEl = lavenderCard.querySelector('.stat-footer-content');
            const lavenderText = rejectedCount > 0 ? `${rejectedCount} submissions need revision` : `Zero submissions pending revision`;
            const badgeText = rejectedCount > 0 ? `⚠️ Action Needed` : `✨ Keep it up`;

            if (!footerEl) {
                lavenderCard.insertAdjacentHTML('beforeend', `
                    <div class="stat-footer-content">
                        <span id="lavender-desc-text">${lavenderText}</span>
                        <span class="stat-mini-badge badge-lavender-sub" id="lavender-badge-text">${badgeText}</span>
                    </div>
                `);
            } else {
                document.getElementById('lavender-desc-text').textContent = lavenderText;
                document.getElementById('lavender-badge-text').textContent = badgeText;
            }
        }


        // --- RENDER CHALLENGE LIST ---
        let items = [];

        ens.forEach(e => {
            const c = LevelUpData.challengeById(e.challengeId);

            if (c) {
                items.push({
                    type: 'enrollment',
                    e,
                    c,
                    status: e.status === 'completed'
                        ? 'approved'
                        : 'in-progress'
                });
            }
        });

        subs.forEach(sub => {
            const c = LevelUpData.challengeById(sub.challengeId);

            if (c) {
                const ix = items.findIndex(x => x.c.id === c.id);

                if (ix >= 0) {
                    if (
                        sub.status !== 'pending' &&
                        sub.status !== 'needs-review'
                    ) {
                        items[ix].status = sub.status;
                    }

                    items[ix].submission = sub;
                } else {
                    items.push({
                        type: 'submission',
                        e: null,
                        c,
                        status: sub.status,
                        submission: sub
                    });
                }
            }
        });

        const q = search.value.toLowerCase();

        items = items.filter(
            x => (x.c.title + ' ' + x.c.category).toLowerCase().includes(q)
        );

        if (filter.value !== 'all') {
            items = items.filter(x => x.status === filter.value);
        }

        listEl.innerHTML = items
            .map(x => {
                const pct = x.status === 'approved'
                    ? 100
                    : (x.e?.progress || 0);

                const action = x.status === 'in-progress'
                    ? `<a class="btn btn-primary btn-sm" href="challenge-session.html?id=${x.c.id}">Continue</a>`
                    : x.status === 'pending' || x.status === 'needs-review'
                        ? `<a class="btn btn-secondary btn-sm" href="submission-status.html?id=${x.submission?.id || ''}">View Status</a>`
                        : x.status === 'rejected'
                            ? `<a class="btn btn-secondary btn-sm" href="proof-submission.html?id=${x.c.id}">Revise</a>`
                            : `<a class="btn btn-secondary btn-sm" href="challenge-detail.html?id=${x.c.id}">Details</a>`;

                return `<article class="progress-item"><div class="item-icon" style="background:${x.c.categoryKey === 'learning' ? '#F0E6F6' : x.c.categoryKey === 'creative' ? '#FFF0E6' : '#E7F2E7'}">${x.c.icon}</div><div><div class="between"><h3>${LevelUpUI.escapeHTML(x.c.title)}</h3>${LevelUpUI.statusBadge(x.status)}</div><p>${x.c.category} · ${x.c.duration}</p><div class="progress-meta" style="margin-top:8px"><span>Progress</span><strong>${pct}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div></div><div class="item-end">${action}</div></article>`;
            })
            .join('');

        empty.classList.toggle('hidden', items.length > 0);

        if (!items.length) {
            empty.innerHTML = LevelUpUI.emptyState(
                'No results found',
                'Try changing your filters or start a new challenge.',
                '<a href="challenges.html" class="btn btn-primary">Explore Challenges</a>'
            );
        }
    }

    search.addEventListener('input', render);
    filter.addEventListener('change', render);

    render();
});