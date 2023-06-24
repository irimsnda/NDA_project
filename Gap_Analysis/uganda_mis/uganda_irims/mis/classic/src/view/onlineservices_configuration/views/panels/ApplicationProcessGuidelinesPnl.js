/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.ApplicationProcessGuidelinesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationprocessguidelinespnl',
    title: 'Application Process Guidelines',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationprocessguidelinesgrid'
        }
    ]
});
