//deplicated
Ext.define('Admin.view.usermanagement.views.panels.ExternalUsersFrmPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'externalusersFrmpnl',
    viewModel: 'usermanagementvm',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 35,
            layout: 'fit',
            items: [{
                xtype: 'displayfield',
                labelAlign: 'right',
                bind: {
                    value: '{titleField.selection.name} {name} ({email})'
                },
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    //'font-style': 'italic',
                    'font-size': '17px',
                    'text-align': 'center'
                }
            }
            ]
        }
    ],
    items: [
        {
            xtype: 'externaluserswizardfrm'
        }
    ]
});