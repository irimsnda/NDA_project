/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.containers.PharmacoVigilanceReporting', {
    extend: 'Ext.Container',
    xtype: 'pharmacovigilancereporting',
    controller: 'pharmacovigilancevctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 23
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 5
        },
        {
            xtype: 'pharmacovigilancereportingdashwrapper',
            region: 'center'
        },
        {
            xtype: 'pharmacovigilancereportingtb',
            region: 'south'
        }
    ]
});