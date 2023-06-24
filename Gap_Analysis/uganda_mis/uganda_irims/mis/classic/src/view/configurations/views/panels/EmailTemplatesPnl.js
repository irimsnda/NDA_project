/**
 * Created by Kip on 2/19/2019.
 */
Ext.define('Admin.view.configurations.views.panels.EmailTemplatesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'emailtemplatespnl',
    title: 'Email Templates',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'emailtemplatesgrid'
        }
    ]
});
