/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpScreening', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpScreeningPanel',
    xtype: 'newgmpscreening',
    items: [
        {
            xtype: 'newgmpscreeningpanel'
        }
    ]
});