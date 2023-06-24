/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.containers.VeterinaryPremisesContainer', {
    extend: 'Ext.Container',
    xtype: 'veterinarypremisescontainer',
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
            xtype: 'veterinarypremisesdashwrapper',
            region: 'center'
        },
        {
            xtype: 'veterinarypremisesregtb',
            region: 'south'
        }
    ]
});