/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.AlterationAmendmentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationamendmentspnl',
    height: '100%',
    layout: {
        type: 'border'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    items: [
        {
            title: 'Form Parts',
            xtype: 'alterationsetupformfieldsgrid',
            flex: 0.5,
            region: 'center'
        },
        {
            title: 'Other Parts',
            xtype: 'alterationsetupparamsgrid',
            flex: 0.5,
            region: 'east'
        }
    ]
});