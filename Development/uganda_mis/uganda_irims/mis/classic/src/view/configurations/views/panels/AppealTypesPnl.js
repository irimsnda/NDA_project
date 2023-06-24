Ext.define('Admin.view.configurations.views.panels.AppealTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'appealTypes',
    title: 'Appeal Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'appealTypesGrid'
        }
    ]
});
