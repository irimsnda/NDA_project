/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.productregistration.views.containers.VeterinaryMedicinesRegCtn', {
    extend: 'Ext.Container',
    xtype: 'veterinarymedicinesregctn',
    controller: 'productregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 7
        },
        {
            xtype: 'drugsproductRegDashWrapper',
            region: 'center'
        },
        {
            xtype: 'vetproductregtb',
            region: 'south'
        }
    ]
});