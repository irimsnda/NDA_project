Ext.define('Admin.view.configurations.views.panels.DisposalInspecTitlesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'disposalInspecTitlesPnl',
    title: 'Disposal Inspectors Titles',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'disposalInspecTitlesGrid'
        }
    ]
});
