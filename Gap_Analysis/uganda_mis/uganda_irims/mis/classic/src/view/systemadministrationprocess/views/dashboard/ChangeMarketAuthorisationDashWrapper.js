/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.dashboards.ChangeMarketAuthorisationDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'changemarketauthorisationdashwrapper',
	itemId:'changemarketauthorisationdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'changemarketauthorisationdash'
        }
    ]
});