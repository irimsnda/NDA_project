/**
 * Created by Sadam on 16/03/2021.
 */
Ext.define('Admin.view.summaryreport.registration.view.panel.RegisteredProductGazettePnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'registeredProductGazettePnl',
	margin: 2,
	layout: 'border',
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
             xtype: 'hiddenfield',
             name: 'module_id',
             value: 1,
             hidden: true
         },{
            xtype: 'registeredProductGazetteFiltersFrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },{
            xtype: 'registeredProductGazetteGrid',
            region: 'center'
        }],
     listeners: {
       // afterrender: 'func_InitloadStore'
     }

 });