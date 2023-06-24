Ext.define('Admin.view.summaryreport.pms.view.panel.PMSZonalReportPnl', {
	extend: 'Ext.panel.Panel',
	xtype: 'pmszonalreport',
	margin: 2,
    controller: 'samplecollectionreportCtr',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'pmszonalreportGrid'
        }
    ],


});