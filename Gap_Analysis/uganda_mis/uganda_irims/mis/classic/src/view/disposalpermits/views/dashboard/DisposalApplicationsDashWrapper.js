/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.disposal.views.dashboard.DisposalApplicationsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'disposalapplicationsdashwrapper',
	itemId:'disposalapplicationsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'disposalapplicationsdash'
        }
    ]
});