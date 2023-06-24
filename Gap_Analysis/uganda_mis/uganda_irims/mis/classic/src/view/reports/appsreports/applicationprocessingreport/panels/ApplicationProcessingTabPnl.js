Ext.define('Admin.view.reports.appsreport.applicationprocessingreport.panels.ApplicationProcessingTabPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'applicationprocessingtabpnl',
	margin: 2,
    controller: 'applicationprocessingreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'applicationprocessingreportgrid',
    	title: 'Application Processing By Process'
    },{
    	xtype: 'applicationprocessingbyuserreportgrid',
    	title: 'Application Processing By User'
    }],
});