Ext.define('Admin.view.summaryreport.pms.view.PMSManufacturerReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'pmsmanufacturerreport',
	margin: 2,
	layout: 'border',
    controller: 'samplecollectionreportCtr',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true,
        split: true,
        //collapsible: true,
        margin:1
        },
    items: [{
        xtype: 'pmsmanufacturerreportFrm',
        region: 'north',
        collapsible: true,
        title: 'Filters'
      },{
    	xtype: 'pmsmanufacturerreportGrid',
        region: 'center'
    }],


});