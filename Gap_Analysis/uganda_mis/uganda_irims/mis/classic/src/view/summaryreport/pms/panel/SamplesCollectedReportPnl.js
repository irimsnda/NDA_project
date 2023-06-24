Ext.define('Admin.view.summaryreport.pms.view.SamplesCollectedReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'SamplesCollectedReport',
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
        xtype: 'samplecollectionreportFrm',
        region: 'north',
        collapsible: true,
        title: 'Filters'
      },{
    	xtype: 'samplecollectionreportGrid',
        region: 'center'
    }],


});