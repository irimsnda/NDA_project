/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.containers.DrugsGmpCtn', {
    extend: 'Ext.Container',
    xtype: 'drugsgmpctn',
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
            value: 2
        },
        {
            xtype: 'drugsgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'drugsgmptb',
            region: 'south'
        }
    ]
});