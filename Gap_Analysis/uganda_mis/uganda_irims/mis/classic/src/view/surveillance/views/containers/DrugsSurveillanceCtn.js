/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.containers.DrugsSurveillanceCtn', {
    extend: 'Ext.Container',
    xtype: 'drugssurveillancectn',
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
            value: 2
        },
        {
            xtype: 'drugssurveillancedashwrapper',
            region: 'center'
        },
        {
            xtype: 'drugssurveillancetb',
            region: 'south'
        }
    ]
});