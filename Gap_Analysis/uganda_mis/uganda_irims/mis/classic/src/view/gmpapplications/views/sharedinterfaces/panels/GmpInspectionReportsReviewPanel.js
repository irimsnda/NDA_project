/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpInspectionReportsReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpinspectionreportsreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpinspectionreportsreviewgrid'
        }
    ]
});