/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.containers.MedicinesPremisesInspection', {
    extend: 'Ext.Container',
    xtype: 'medicinespremisesinspection',
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
            value: 2
        },
        {
            xtype: 'medicinespremisesinspectiondashwrapper',
            region: 'center'
        },
        {
            xtype: 'medicinespremisesinspectiontb',
            region: 'south'
        }
    ]
});