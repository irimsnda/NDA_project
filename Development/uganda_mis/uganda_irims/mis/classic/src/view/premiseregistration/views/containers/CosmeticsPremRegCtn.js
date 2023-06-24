/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.containers.CosmeticsPremRegCtn', {
    extend: 'Ext.Container',
    xtype: 'cosmeticspremregctn',
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
            value: 3
        },
        {
            xtype: 'cosmeticspremregdashwrapper',
            region: 'center'
        },
        {
            xtype: 'cosmeticspremregtb',
            region: 'south'
        }
    ]
});