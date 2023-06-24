/**
 * Created by Kip on 8/17/2018.
 */
Ext.define('Admin.view.usermanagement.views.panels.UsersPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'userspnl',
    layout: 'fit',
    viewModel: 'usermanagementvm',
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
            xtype: 'userswizardfrm'
        }
    ]
});