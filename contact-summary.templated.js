// 
const { DateTime } = require('luxon');
const Nootils = require('cht-nootils/src/nootils');
global.Utils = Nootils();


function daysSinceLastRequest (allReports) {
  // eslint-disable-next-line no-undef
  const latestAssessment = Utils.getMostRecentReport(allReports, 'stock_refill');
  if (!latestAssessment) { return; }
  
  const reportedDate = DateTime.fromMillis(latestAssessment.reported_date);
  return Math.abs(reportedDate.diffNow('days').days);
}
  
function hasBeenRecentlyReqested (allReports) {
  const daysElapsed = daysSinceLastRequest(allReports);
  return daysElapsed !== undefined && daysElapsed <= 1;
}



const context = {
  // eslint-disable-next-line no-undef
  recentlyRequested: hasBeenRecentlyReqested(reports)
};


module.exports = {
  context: context
};