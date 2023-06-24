/**
 * Created by Kip on 6/10/2019.
 */
Ext.define('Admin.view.configurations.views.panels.ApplicationSectionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationsectionspnl',
    title: 'Application Sections',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationsectionsgrid'
        }
    ]
});
