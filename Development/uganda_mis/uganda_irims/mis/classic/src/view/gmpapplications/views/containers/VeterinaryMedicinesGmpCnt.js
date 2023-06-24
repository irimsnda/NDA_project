/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.containers.VeterinaryMedicinesGmpCnt', {
    extend: 'Ext.Container',
    xtype: 'veterinarymedicinesgmpcnt',
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
            value: 7
        },
        {
            xtype: 'drugsgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'veterinarymedicinesgmptb',
            region: 'south'
        }
    ]
});