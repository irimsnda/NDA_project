Ext.define('Admin.view.audit_trail.view.panel.LoginLogsPnl', {
	extend: 'Ext.form.Panel',
	xtype: 'loginLogs',
	margin: 2,
	layout: 'fit',
    controller: 'audit_trialViewCtr',
    defaults: {
        bodyPadding: 10,
        scrollable: true,
    },
    items: [{
        xtype:'loginLogsGrid'
    }]
});