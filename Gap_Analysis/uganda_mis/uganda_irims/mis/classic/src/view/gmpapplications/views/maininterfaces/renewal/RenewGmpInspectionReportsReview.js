/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpInspectionReportsReview', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspectionReportsReview',
    xtype: 'renewgmpinspectionreportsreview',
    items: [
        {
            xtype: 'renewgmpinspectionreportsreviewpanel'
        }
    ]
});