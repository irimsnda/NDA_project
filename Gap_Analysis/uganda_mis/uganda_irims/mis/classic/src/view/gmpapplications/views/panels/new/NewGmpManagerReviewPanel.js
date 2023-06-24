Ext.define('Admin.view.gmpapplications.views.panels.new.NewGmpManagerReviewPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'newgmpmanagerreviewpanel',
    items: [
        {
            xtype: 'gmpnewmanagerreviewgrid'
        }
    ]
});