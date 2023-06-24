Ext.define('Admin.view.summaryreport.Documents_Reports.view.panel.DocumentReportsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'documentReportsPnl',
    title: 'Document Report',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationDocumentReportGrid'
        }
    ]
});
