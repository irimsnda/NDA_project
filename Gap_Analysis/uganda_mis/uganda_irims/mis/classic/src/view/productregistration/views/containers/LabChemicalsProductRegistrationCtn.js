/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.productregistration.views.containers.LabChemicalsProductRegistrationCtn', {
    extend: 'Ext.Container',
    xtype: 'labchemicalsProductRegistrationCtn',
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
            value: 15
        },
        {
            xtype: 'cosmeticsproductRegDashWrapper',
            region: 'center',
        },
        {
            xtype: 'cosmeticsProductRegTb',
            region: 'south'
        }
    ]
});