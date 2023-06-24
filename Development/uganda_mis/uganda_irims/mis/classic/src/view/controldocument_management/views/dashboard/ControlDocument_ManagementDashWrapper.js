/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.controldocument_management.views.dashboard.ControlDocument_ManagementDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'controldocument_managementdashwrapper',
	itemId:'controldocument_managementdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'controldocument_managementdash'
        }
    ]
});