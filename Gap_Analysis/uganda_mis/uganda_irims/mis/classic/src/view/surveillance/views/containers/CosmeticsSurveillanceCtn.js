/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.containers.CosmeticsSurveillanceCtn', {
    extend: 'Ext.Container',
    xtype: 'cosmeticssurveillancectn',
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
            value: 3
        },
        {
            xtype: 'cosmeticssurveillancedashwrapper',
            region: 'center'
        },
        {
            xtype: 'cosmeticssurveillancetb',
            region: 'south'
        }
    ]
});