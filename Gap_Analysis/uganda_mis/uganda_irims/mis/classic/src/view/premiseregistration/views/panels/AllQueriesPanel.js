/**
 * Created by Kip on 11/5/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.AllQueriesPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'allqueriespanel',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: 'application_code'
        }, {
            xtype: 'hiddenfield',
            name: 'module_id'
        }, {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        }, {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'tabpanel',
            items:[
                {
                    title: 'Evaluation Queries',
                    xtype: 'allqueriesgrid',
                    checklist_category: 2
                },
                {
                    title: 'Inspection Queries',
                    xtype: 'allqueriesgrid',
                    checklist_category: 3
                }
            ]
        }
    ]
});