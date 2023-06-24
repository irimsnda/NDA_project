/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ProgressReportManagerReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'progressreportmanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'progressreportmanagerreviewgrid'
        }
    ]
});