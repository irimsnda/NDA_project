/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.containers.FoodSurveillanceCtn', {
    extend: 'Ext.Container',
    xtype: 'foodsurveillancectn',
    controller: 'surveillancevctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 5
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'foodsurveillancedashwrapper',
            region: 'center'
        },
        {
            xtype: 'foodsurveillancetb',
            region: 'south'
        }
    ]
});