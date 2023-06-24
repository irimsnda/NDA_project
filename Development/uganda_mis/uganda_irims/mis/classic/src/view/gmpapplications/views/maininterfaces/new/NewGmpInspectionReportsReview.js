/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpInspectionReportsReview', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspectionReportsReview',
    xtype: 'newgmpinspectionreportsreview',
    items: [
        {
            xtype: 'newgmpinspectionreportsreviewpanel'
        }
    ]
});