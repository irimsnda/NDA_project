/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ProgressReportManagErevaluationPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'progressreportmanagerevaluationpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'progressreportmanagerevaluationgrid'
        }
    ]
});