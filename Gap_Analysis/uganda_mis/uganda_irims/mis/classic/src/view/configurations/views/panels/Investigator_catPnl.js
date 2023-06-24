Ext.define('Admin.view.configurations.views.panels.Investigator_catPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'investigator_cat',
    title: 'Investigators Category',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'investigator_catGrid'
        }
    ]
});
