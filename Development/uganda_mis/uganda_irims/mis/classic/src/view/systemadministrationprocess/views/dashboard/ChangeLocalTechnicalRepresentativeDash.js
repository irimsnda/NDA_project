/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.dashboards.ChangeLocalTechnicalRepresentativeDash', {
    extend: 'Ext.Container',
    xtype: 'changelocaltechnicalrepresentativedash',
    layout: 'fit',
    items: [
        {
            xtype: 'changelocaltechnicalrepresentativedashgrid',
            region: 'center',
            title: 'Changed Local Technical Represenatative',
            margin: 2
        }
    ]
});