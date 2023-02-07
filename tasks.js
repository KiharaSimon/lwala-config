/* eslint-disable no-unused-vars */
const { getStockItemSelected } = require("./stock-refill");

// eslint-disable-next-line no-undef
const isSupervisor = () => user.parent && user.parent.type === 'district_hospital';
// const isVHT = () => user.parent && user.parent.type === 'health_center';

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
    resolvedIf: (c) => {
      
    },
    actions: [
      {
        type: 'report',
        form: 'stockout',
        label: 'task.stockout.label',
        modifyContent: (content, c) => {
          
          const stockValues = getStockItemSelected();
          const stockValuesIndividual = stockValues.map((item) => item.value);
      
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