/**
 * Created by Kip on 3/12/2019.
 */
/*Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsManagerEvaluationPnl', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.panels.PmsManagerEvaluationPanel',
    xtype: 'structuredpmsmanagerevaluationpnl'
});*/

Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsManagerEvaluationPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'structuredpmsmanagerevaluationpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'pmsmanagerevaluationgrid'
        }
    ]
});