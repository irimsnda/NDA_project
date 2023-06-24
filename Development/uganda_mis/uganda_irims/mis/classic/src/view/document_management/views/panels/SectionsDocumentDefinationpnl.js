/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.document_managemetn.views.panels.SectionsDocumentDefinationpnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sectionsDocumentDefinationpnl',
    layout: 'fit',
    viewModel: 'workflowmanagementvm',
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                name: 'site_name',
                labelAlign: 'right',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-style': 'italic',
                    'font-size': '12px',
                    'text-align': 'center'
                }
            },{
                xtype: 'displayfield',
                value: '|'  
            },{
                xtype: 'displayfield',
                name: 'section_name',
                labelAlign: 'right',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-style': 'italic',
                    'font-size': '12px',
                    'text-align': 'center'
                }
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'directorateSectionsDocDefinationWizardfrm'
        }
    ]
});