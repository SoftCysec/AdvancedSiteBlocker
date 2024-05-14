let blockedSites = [];
let flaggedSites = [];
let blockSchedule = { start: "09:00", end: "17:00" };
let sessionTimes = {};

chrome.storage.sync.get(["blockedSites", "flaggedSites", "blockSchedule"], (data) => {
    if (data.blockedSites) blockedSites = data.blockedSites;
    if (data.flaggedSites) flaggedSites = data.flaggedSites;
    if (data.blockSchedule) blockSchedule = data.blockSchedule;
});

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const currentTime = new Date();
        const start = new Date();
        const end = new Date();

        [start.setHours(...blockSchedule.start.split(":")), start.setMinutes(0), start.setSeconds(0)];
        [end.setHours(...blockSchedule.end.split(":")), end.setMinutes(0), end.setSeconds(0)];

        const siteBlocked = blockedSites.some(site => details.url.includes(site));

        if (siteBlocked && currentTime >= start && currentTime <= end) {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId },
                files: ['content.js']
            });
            return { cancel: true };
        }

        // Monitoring flagged sites session time
        const siteFlagged = flaggedSites.some(site => details.url.includes(site));
        if (siteFlagged) {
            const siteKey = details.tabId + details.url;
            if (!sessionTimes[siteKey]) {
                sessionTimes[siteKey] = Date.now();
            }
            chrome.alarms.create(siteKey, { delayInMinutes: 5 });
        }
    }, { urls: ["<all_urls>"], types: ["main_frame"] }, ["blocking"]
);

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name in sessionTimes) {
        const siteTime = Date.now() - sessionTimes[alarm.name];
        if (siteTime > 5 * 60 * 1000) { // 5 minutes
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Attention',
                message: 'You have spent too much time on a flagged site. Consider taking a break.'
            });
        }
        delete sessionTimes[alarm.name];
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("updateBlocker", { periodInMinutes: 1 });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addSite") {
        blockedSites.push(request.site);
        chrome.storage.sync.set({ blockedSites }, () => {
            sendResponse({ status: "Site added" });
        });
    }
    if (request.action === "addFlaggedSite") {
        flaggedSites.push(request.site);
        chrome.storage.sync.set({ flaggedSites }, () => {
            sendResponse({ status: "Flagged site added" });
        });
    }
    return true; // Required to indicate that sendResponse will be called asynchronously
});