/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.dashboards.ChangeLocalTechnicalRepresentativeDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'changelocaltechnicalrepresentativedashwrapper',
	itemId:'changelocaltechnicalrepresentativedashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'changelocaltechnicalrepresentativedash'
        }
    ]
});