/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.unstructured.UnStructuredPmsManagerEvaluationPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'unstructuredpmsmanagerevaluationpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'pmsmanagerevaluationgrid'
        }
    ]
});