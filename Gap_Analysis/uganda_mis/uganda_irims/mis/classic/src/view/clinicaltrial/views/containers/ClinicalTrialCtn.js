/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.containers.ClinicalTrialCtn', {
    extend: 'Ext.Container',
    xtype: 'clinicaltrialctn',
    controller: 'clinicaltrialvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 7
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 5
        },
        {
            xtype: 'clinicaltrialdashwrapper',
            region: 'center'
        },
        {
            xtype: 'clinicaltrialtb',
            region: 'south'
        }
    ]
});