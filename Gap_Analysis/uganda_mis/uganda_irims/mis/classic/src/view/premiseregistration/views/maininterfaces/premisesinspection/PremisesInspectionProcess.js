/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.maininterfaces.premisesinspection.PremisesInspectionProcess', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesinspectionprocess',
    layout:'fit',
    items: [
        {
            xtype: 'premisesinspectionprocesspnl'
        }
    ]
});