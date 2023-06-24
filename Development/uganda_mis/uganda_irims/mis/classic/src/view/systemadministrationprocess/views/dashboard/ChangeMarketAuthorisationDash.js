/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.dashboards.ChangeMarketAuthorisationDash', {
    extend: 'Ext.Container',
    xtype: 'changemarketauthorisationdash',
    layout: 'fit',
    items: [
        {
            xtype: 'changemarketauthorisationdashgrid',
            region: 'center',
            title: 'Changed Market Authorisation Applications',
            margin: 2
        }
    ]
});