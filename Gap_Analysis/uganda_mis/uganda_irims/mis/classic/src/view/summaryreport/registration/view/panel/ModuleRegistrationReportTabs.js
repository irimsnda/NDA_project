Ext.define('Admin.view.summaryreport.registration.view.panel.ModuleRegistrationReportTabs', {
	extend: 'Ext.tab.Panel',
	xtype: 'moduleregistrationreporttabs',
	margin: 2,
    controller: 'registrationreportviewctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [{
    	xtype: 'moduleregreportgrid',
    	title: 'Module Registration Report'
    },{
    	xtype: 'sectionregreportgrid',
    	title: 'Section Registration Report'
    }],
});