Ext.define('Admin.view.configurations.views.panels.Gmdn_CodesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmdn_codes',
    title: 'GMDN Codes',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gmdn_codesGrid'
        }
    ]
});
