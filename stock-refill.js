// import stockItems from './stock-list';
import Nootils from 'cht-nootils/src/nootils';
global.Utils = Nootils();
// const isReportValid = function (report) {
//   if (report.form && report.fields && report.reported_date) { return true; }
//   return false;
// };

// const getField = (report, fieldPath) => ['fields', ...(fieldPath || '').split('.')]
//   .reduce((prev, fieldName) => {
//     if (prev === undefined) { return undefined; }
//     return prev[fieldName];
//   }, report);

// function getNewestReport(allReports, forms) {
//   let result;
//   allReports.forEach(function (report) {
//     if (!isReportValid(report) || !forms.includes(report.form)) { return; }
//     if (!result || report.reported_date > result.reported_date) {
//       result = report;
//     }
//   });
//   return result;
// }

// eslint-disable-next-line no-unused-vars
const stockItems = [
  'act',
  'zinc',
  'amoxicillin',
  'condoms',
  'contraceptives',
  'sayana'
];
const getField = (report, fieldPath) => ['fields', ...(fieldPath || '').split('.')]
  .reduce((prev, fieldName) => {
    if (prev === undefined) { return undefined; }
    return prev[fieldName];
  }, report);


const getFieldValue = (report, fieldName) => {
  // eslint-disable-next-line no-undef
  const fieldValue = getField(report, fieldName);
  const value = parseFloat(fieldValue);
  if (!Number.isNaN(value)) {
    return value;
  }
  return 0;
};

const getLatestStockSummary = (reports) => {
  const latestReports = {};
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];
    if (report.form !== 'commodities-approval-request') {
      continue;
    }

    const createdByDoc = report.created_by_doc;

    if (!latestReports[createdByDoc]) {
      latestReports[createdByDoc] = report;
    }

    const latestReport = latestReports[createdByDoc];

    if (report.reported_date > latestReport.reported_date) {
      latestReports[createdByDoc] = report;
    }
  }
  return latestReports;
};



const getStockItemSelected = () => {
  
  // eslint-disable-next-line no-undef
  const latestStockSummary = getLatestStockSummary(reports);

  // eslint-disable-next-line guard-for-in
  for (const k in latestStockSummary) {
    if (Object.prototype.hasOwnProperty.call(latestStockSummary, k)) {
      const valueArray = [];
      const report = latestStockSummary[k];
      for (let i = 0; i < stockItems.length; i++){
        const label = getField(report, `p_is_${stockItems[i]}_selected`);
        const value = getFieldValue(report, `p_${stockItems[i]}_requested`);
        
        valueArray.push(label);
        valueArray.push(value);
          
      }
        
      return valueArray;
       
    }

    
      
  }
};


export { getStockItemSelected};

  






