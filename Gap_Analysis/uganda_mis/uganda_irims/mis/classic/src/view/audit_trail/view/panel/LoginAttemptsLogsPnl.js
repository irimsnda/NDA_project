Ext.define('Admin.view.audit_trail.view.panel.LoginAttemptsLogsPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'loginattemptsLogs',
	margin: 2,
	layout: 'fit',
    controller: 'audit_trialViewCtr',
    defaults: {
        bodyPadding: 10,
        scrollable: true,
    },
    items: [{
        xtype:'loginattemptslogsGrid'
    }]
});