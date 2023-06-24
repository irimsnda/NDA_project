/**
 * Created by Kip on 11/5/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.AllChecklistsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'allchecklistspanel',
    controller: 'premiseregistrationvctr',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        }, {
            xtype: 'hiddenfield',
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'tabpanel',
            items:[
                {
                    title: 'Evaluation Checklists',
                    xtype: 'allchecklistsgrid',
                    workflow_stage: ''
                },
                {
                    title: 'Inspection Checklists',
                    xtype: 'allchecklistsgrid',
                    workflow_stage: ''
                }
            ]
        }
    ]
});