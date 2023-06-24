/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.productregistration.views.containers.AntisepticsProductRegistrationCtn', {
    extend: 'Ext.Container',
    xtype: 'antisepticsProductRegistrationCtn',
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
            value: 20
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