Ext.define('Admin.view.frontoffice.views.enquiries.panel.ApplicationEnquiriesPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'application_enquiries',
	margin: 2,
	layout: 'fit',
    controller: 'enquiriesCtr',
    defaults: {
        bodyPadding: 10,
        scrollable: true,
    },
    items: [{
        xtype:'application_enquiriesGrid'
    }]
});