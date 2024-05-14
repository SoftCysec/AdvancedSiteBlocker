document.addEventListener('DOMContentLoaded', () => {
    const siteInput = $('#site');
    const flaggedSiteInput = $('#flaggedSite');
    const startInput = $('#start');
    const endInput = $('#end');
    const blockedSitesList = $('#blockedSitesList');
    const flaggedSitesList = $('#flaggedSitesList');

    // Load saved settings
    chrome.storage.sync.get(['blockedSites', 'flaggedSites', 'blockSchedule'], (data) => {
        if (data.blockedSites) {
            blockedSitesList.html(data.blockedSites.map(site => `<li class="collection-item">${site}</li>`).join(''));
        }
        if (data.flaggedSites) {
            flaggedSitesList.html(data.flaggedSites.map(site => `<li class="collection-item">${site}</li>`).join(''));
        }
        if (data.blockSchedule) {
            startInput.val(data.blockSchedule.start);
            endInput.val(data.blockSchedule.end);
        }
    });

    $('#addSite').click(() => {
        const site = siteInput.val().trim();
        if (site) {
            chrome.runtime.sendMessage({ action: 'addSite', site }, (response) => {
                blockedSitesList.append(`<li class="collection-item">${site}</li>`);
                siteInput.val('');
            });
        }
    });

    $('#addFlaggedSite').click(() => {
        const flaggedSite = flaggedSiteInput.val().trim();
        if (flaggedSite) {
            chrome.runtime.sendMessage({ action: 'addFlaggedSite', site: flaggedSite }, (response) => {
                flaggedSitesList.append(`<li class="collection-item">${flaggedSite}</li>`);
                flaggedSiteInput.val('');
            });
        }
    });

    $('#save').click(() => {
        const start = startInput.val();
        const end = endInput.val();
        chrome.storage.sync.set({ blockSchedule: { start, end } }, () => {
            M.toast({ html: 'Settings saved!' });
        });
    });
});