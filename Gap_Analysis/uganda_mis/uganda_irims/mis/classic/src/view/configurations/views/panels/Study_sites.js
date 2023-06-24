Ext.define('Admin.view.configurations.views.panels.Study_sites', {
    extend: 'Ext.panel.Panel',
    xtype: 'study_sites',
    title: 'Clinical Trial Study Sites',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'study_sitesGrid'
        }
    ]
});
