Ext.define('Admin.view.configurations.views.panels.ClinicalReportTypePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicalreporttype',
    title: 'GMDN Codes',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'clinicalreportTypeGrid'
        }
    ]
});
