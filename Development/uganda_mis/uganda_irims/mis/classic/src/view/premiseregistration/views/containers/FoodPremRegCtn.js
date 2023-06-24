/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.containers.FoodPremRegCtn', {
    extend: 'Ext.Container',
    xtype: 'foodpremregctn',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 2
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'foodpremregdashwrapper',
            region: 'center'
        },
        {
            xtype: 'foodpremregtb',
            region: 'south'
        }
    ]
});