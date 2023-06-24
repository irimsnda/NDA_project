/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpManagerReview', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpManagerReview',
    xtype: 'altgmpmanagerreview',
    items: [
        {
            xtype: 'altgmpmanagerreviewpanel'
        }
    ]
});