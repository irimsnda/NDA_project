Ext.define('Admin.view.frontoffice.views.enquiries.panel.ApplicationSubmissionsEnquiriesPnl', {
	extend: 'Ext.tab.Panel',
	xtype: 'application_submissionenquiries',
	margin: 2,
	layout: 'fit',
    controller: 'enquiriesCtr',
    defaults: {
        bodyPadding: 10,
        scrollable: true,
    },
    items: [{
        title: 'Online Summary Submissions Counter',
        xtype:'enquiriessubmissioncounterGrid'
    },{
        title: 'Online Summary Applications Submissions',
        xtype:'enquiriessubmissionapplicationsGrid'
    }]
});