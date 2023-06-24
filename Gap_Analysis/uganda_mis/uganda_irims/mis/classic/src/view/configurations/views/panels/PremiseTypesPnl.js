Ext.define('Admin.view.configurations.views.panels.PremiseTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisetypes',
    title: 'Premise Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'premiseTypesGrid'
        }
    ]
});
