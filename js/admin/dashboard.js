document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil data dari sistem LevelUpData
    const cs = LevelUpData.getChallenges() || [];
    const paths = LevelUpData.getPaths() || [];
    const subs = LevelUpData.getSubmissions() || [];
    const users = LevelUpData.getUsers() || [];
    const history = LevelUpData.getReviewHistory() || [];

    // Hitung statistik utama
    const activeChallengesCount = cs.filter(c => c.status === 'active').length;
    const draftCount = cs.filter(c => c.status === 'draft').length;
    const archivedCount = cs.filter(c => c.status === 'archived').length;
    const pendingCount = subs.filter(s => s.status === 'pending').length;
    const reviewCount = subs.filter(s => s.status === 'needs-review').length;

    // 2. Masukkan ke kartu statistik atas (Mendukung berbagai variasi ID HTML)
    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setElementText('admin-active-challenges', activeChallengesCount);
    setElementText('admin-path-count', paths.length);
    setElementText('admin-pending-count', pendingCount);
    setElementText('admin-review-count', reviewCount);

    // 3. Render tabel antrean (Priority Queue / Latest Submissions)
    const queueEl = document.getElementById('admin-dashboard-queue');
    if (queueEl) {
        const waitingSubs = subs.filter(s => s.status === 'pending' || s.status === 'needs-review');
        
        if (waitingSubs.length > 0) {
            queueEl.innerHTML = waitingSubs.slice(0, 5).map(s => {
                const u = users.find(x => x.id === s.userId);
                const c = LevelUpData.challengeById(s.challengeId);

                return `
                    <tr>
                        <td>
                            <div class="table-title">${u?.name || 'User'}</div>
                            <div class="table-sub">${u?.email || ''}</div>
                        </td>
                        <td>${LevelUpUI ? LevelUpUI.escapeHTML(c?.title || '—') : (c?.title || '—')}</td>
                        <td>${LevelUpUI ? LevelUpUI.statusBadge(s.status) : s.status}</td>
                        <td>
                            <a class="link" href="submission-detail.html?id=${s.id}">Review ↗</a>
                        </td>
                    </tr>
                `;
            }).join('');
        } else {
            queueEl.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #64748b; padding: 20px;">No submissions are waiting for review.</td></tr>';
        }
    }

    // 4. Render Challenge Status / Content Health (Progress bar Active, Draft, Archived)
    const contentStatsEl = document.getElementById('admin-content-stats');
    if (contentStatsEl) {
        const totalCs = cs.length || 1;
        const statsData = [
            ['Active', activeChallengesCount, '#47B5A8'],
            ['Draft', draftCount, '#F7E289'],
            ['Archived', archivedCount, '#A3C1E2']
        ];

        contentStatsEl.innerHTML = statsData.map(x => `
            <div class="progress-list-item" style="margin-bottom: 12px;">
                <div class="progress-meta" style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px;">
                    <span>${x[0]}</span>
                    <strong>${x[1]}</strong>
                </div>
                <div class="progress-track" style="background: #e2e8f0; border-radius: 99px; height: 8px; overflow: hidden;">
                    <div class="progress-fill" style="width:${(x[1] / totalCs) * 100}%; background:${x[2]}; height: 100%; border-radius: 99px;"></div>
                </div>
            </div>
        `).join('');
    }

    // 5. Render Recent Review Activity (Riwayat keputusan bawah)
    const recentHistoryEl = document.getElementById('admin-recent-history');
    if (recentHistoryEl) {
        const recentItems = history.slice(0, 4);

        if (recentItems.length > 0) {
            recentHistoryEl.innerHTML = recentItems.map(h => {
                const c = LevelUpData.challengeById(h.challengeId);
                const isApproved = h.decision === 'approved';

                return `
                    <div class="activity-row" style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                        <div class="activity-icon" style="width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; background: ${isApproved ? '#dcfce7' : '#fee2e2'}; color: ${isApproved ? '#15803d' : '#b91c1c'}; font-weight: bold;">
                            ${isApproved ? '✓' : '↻'}
                        </div>
                        <div style="flex:1">
                            <strong style="font-size: 14px; color: #1e293b;">${LevelUpUI ? LevelUpUI.escapeHTML(c?.title || 'Challenge') : (c?.title || 'Challenge')}</strong>
                            <p style="margin: 0; font-size: 12px; color: #64748b;">${h.reason || 'No additional notes provided.'}</p>
                        </div>
                        <div>
                            ${LevelUpUI ? LevelUpUI.statusBadge(h.decision) : h.decision}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            recentHistoryEl.innerHTML = '<p class="muted small" style="color: #64748b; padding: 10px 0;">No review decisions have been recorded yet.</p>';
        }
    }
});