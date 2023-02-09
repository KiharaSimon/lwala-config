/* eslint-disable no-undef */

// import stockItems from './stock-list';
const Nootils = require('cht-nootils/src/nootils');
global.Utils = Nootils();

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



const getStockItemSelected = (reports) => {
  
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



// eslint-disable-next-line no-undef
const isSupervisor = () => user.parent && user.parent.type === 'district_hospital';
// const isVHT = () => user.parent && user.parent.type === 'health_center';


const formInSubmittedWindowMatchesFields = (contact, event, dueDate, form, fields) => {
  let result = false;
  const start = Utils.addDate(dueDate, -event.start).getTime();
  const end = Utils.addDate(dueDate, event.end + 1).getTime();
  contact.reports.forEach(function (report) {
    if (!result && report.form === form) {
      if (report.reported_date >= start && report.reported_date <= end &&
        (!fields || (report.fields && Utils.fieldsMatch(report, fields)))) {
        result = true;
      }
    }
  });
  return result;
};

module.exports = [
  {
    name: `stockout`,
    icon: 'treatment',
    title: 'task.stockout.title',
    appliesTo: 'contacts',
    appliesIf: (c) => {
      return (
        c.contact.type === 'health_center' && isSupervisor() 
      );
    },
    // eslint-disable-next-line no-unused-vars
    resolvedIf: (contact, report, event, dueDate) =>
      (formInSubmittedWindowMatchesFields(contact, event, dueDate, 'stockout',
        { 'inputs.task_name': 'stockout' })),
    
    // (c, reports) => {
    // const latestStockoutReport = Utils.getMostRecentReport(c.reports, 'stockout');
    // const actGiven = Utils.getField(latestStockoutReport, 'vht_stock_details.act_given');
    // const zincGiven = Utils.getField(latestStockoutReport, 'vht_stock_details.zinc_given');
    // const amoxicillinGiven = Utils.getField(latestStockoutReport, 'vht_stock_details.amoxicillin_given');
    // const condomsGiven = Utils.getField(latestStockoutReport, 'vht_stock_details.condoms_given');
    // const contraceptivesGiven = Utils.getField(latestStockoutReport, 'vht_stock_details.contraceptives_given');
    // const sayanaGiven = Utils.getField(latestStockoutReport, 'vht_stock_details.sayana_given');

    // return latestStockoutReport
    // },
    actions: [
      {
        type: 'report',
        form: 'stockout',
        label: 'task.stockout.label',
        // eslint-disable-next-line no-unused-vars
        modifyContent: (content, c) => {
          
          const stockValues = getStockItemSelected(c.reports);
          const stockValuesIndividual = stockValues.map((item) => item);
      
          content.act_stock_selected = stockValuesIndividual[0];
          content.act_stock_value_requeted = stockValuesIndividual[1];
          content.zinc_stock_selected = stockValuesIndividual[2];
          content.zinc_stock_value_requested = stockValuesIndividual[3];
          content.amoxicillin_stock_selected = stockValuesIndividual[4];
          content.amoxicillin_stock_value_requested = stockValuesIndividual[5];
          content.condoms_stock_selected = stockValuesIndividual[6];
          content.condoms_stock_value_requested = stockValuesIndividual[7];
          content.contraceptives_stock_selected = stockValuesIndividual[8];
          content.contraceptives_stock_value_requested = stockValuesIndividual[9];
          content.sayana_stock_selected = stockValuesIndividual[10];
          content.sayana_stock_value_requested = stockValuesIndividual[11];
        },
      },
    ],
    events: [
      {
        id: 'stockout',
        start: 0,
        end: 2,
        dueDate: () => {
          return new Date();
        },
      },
    ],
  }
];