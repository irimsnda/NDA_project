Ext.define('Admin.view.configurations.views.panels.DirectorateEmailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'directorateEmails',
    title: 'Directorate Emails',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'directorateEmailsGrid'
        }
    ]
});
