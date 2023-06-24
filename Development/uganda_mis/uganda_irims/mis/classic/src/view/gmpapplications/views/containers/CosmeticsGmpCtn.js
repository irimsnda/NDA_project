/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.containers.CosmeticsGmpCtn', {
    extend: 'Ext.Container',
    xtype: 'cosmeticsgmpctn',
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
            value: 3
        },
        {
            xtype: 'cosmeticsgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'cosmeticsgmptb',
            region: 'south'
        }
    ]
});