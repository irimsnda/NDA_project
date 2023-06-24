/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.containers.FoodGmpCtn', {
    extend: 'Ext.Container',
    xtype: 'foodgmpctn',
    controller: 'gmpapplicationsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 3
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'foodgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'foodgmptb',
            region: 'south'
        }
    ]
});